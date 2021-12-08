import React, {
  FC,
  useContext,
  useCallback,
  createContext,
  useState,
  useMemo,
} from 'react'
import { OrderQueueContext } from '@vtex/order-manager'

import { UseLogger } from '../utils/logger'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
  PaymentSystem,
  InstallmentOption,
  AvailableAccount,
  Payment,
  PaymentInput,
  Totalizer,
} from '../typings'

export const QueueStatus = {
  PENDING: 'Pending',
  FULFILLED: 'Fulfilled',
} as const

type ListenFunction = (event: any, callback: () => void) => () => void
interface QueueContext {
  enqueue: (task: () => Promise<CheckoutOrderForm>, id?: string) => any
  listen: ListenFunction
  isWaiting: (id: string) => boolean
}

interface OrderContext {
  loading: boolean
  setOrderForm: (nextValue: Partial<CheckoutOrderForm>) => void
  error: any | undefined
  orderForm: CheckoutOrderForm
}

type UseUpdateOrderFormPayment = () => {
  updateOrderFormPayment: (
    paymentData: PaymentDataInput,
    orderFormId?: string
  ) => Promise<CheckoutOrderForm>
}

interface CreateOrderPaymentProvider<O extends CheckoutOrderForm> {
  useLogger: UseLogger
  useOrderQueue: () => QueueContext
  useOrderForm: () => OrderContext
  useUpdateOrderFormPayment: UseUpdateOrderFormPayment
  useQueueStatus: (listen: OrderQueueContext<O>['listen']) => any
}

interface Context {
  setPaymentField: (
    paymentField: Partial<PaymentInput>
  ) => Promise<{ success: boolean }>
  paymentSystems: PaymentSystem[]
  availableAccounts: AvailableAccount[]
  installmentOptions: InstallmentOption[]
  payment: Payment
  referenceValue: number
  value: number
  interestValue: number
  cardLastDigits: string
  setCardLastDigits: (cardDigits: string) => void
  paymentsValid: boolean
  setCardFormFilled: (filled: boolean) => void
  isFreePurchase: boolean
}

const SET_PAYMENT_TASK = 'SetPaymentTask'
const OrderPaymentContext = createContext<Context | undefined>(undefined)

export function createOrderPaymentProvider({
  useLogger,
  useOrderQueue,
  useOrderForm,
  useUpdateOrderFormPayment,
  useQueueStatus,
}: CreateOrderPaymentProvider<CheckoutOrderForm>) {
  const OrderPaymentProvider: FC = ({ children }) => {
    const { enqueue, listen } = useOrderQueue()
    const { orderForm, setOrderForm } = useOrderForm()
    const [cardLastDigits, setCardLastDigits] = useState('')
    const [cardFormFilled, setCardFormFilled] = useState(false)
    const queueStatusRef = useQueueStatus(listen)
    const { updateOrderFormPayment } = useUpdateOrderFormPayment()
    const { log } = useLogger()

    const {
      id,
      totalizers,
      paymentData: {
        paymentSystems,
        availableAccounts,
        installmentOptions,
        payments,
      },
    } = orderForm

    const referenceValue =
      totalizers?.reduce((total: number, totalizer: Totalizer) => {
        if (totalizer?.id === 'Tax' || totalizer?.id === 'interest') {
          return total
        }

        return total + (totalizer?.value ?? 0)
      }, 0) ?? 0

    const value =
      payments?.reduce(
        (total: number, payment: Payment) => total + (payment?.value ?? 0),
        0
      ) ?? 0

    const interestValue =
      payments?.reduce(
        (total: number, payment: Payment) =>
          total + ((payment?.value ?? 0) - (payment?.referenceValue ?? 0)),
        0
      ) ?? 0

    const payment = payments?.[0] ?? {}

    const isFreePurchase = !referenceValue && orderForm.items.length > 0

    const paymentsValid = useMemo(() => {
      if (isFreePurchase) {
        return true
      }

      if (!payments?.length) {
        return false
      }

      if (
        payments
          .map((p: Payment) => p.paymentSystem)
          .map((paymentSystem?: string | null) =>
            paymentSystems.find((ps: PaymentSystem) => ps.id === paymentSystem)
          )
          .some(
            (paymentSystem?: PaymentSystem) =>
              paymentSystem?.groupName === 'creditCardPaymentGroup'
          )
      ) {
        return (
          cardFormFilled &&
          payments.every((p: Payment) => p.installments != null)
        )
      }

      return true
    }, [cardFormFilled, isFreePurchase, paymentSystems, payments])

    const setOrderPayment = useCallback(
      async (paymentData: PaymentDataInput) => {
        try {
          const task = async () => {
            const newOrderForm = await updateOrderFormPayment(paymentData, id)

            return newOrderForm
          }

          const newOrderForm = await enqueue(task, SET_PAYMENT_TASK)

          if (queueStatusRef.current === QueueStatus.FULFILLED) {
            setOrderForm(newOrderForm)
          }

          return { success: true }
        } catch (err) {
          if (!err || err.code !== 'TASK_CANCELLED') {
            throw err
          }

          return { success: false }
        }
      },
      [enqueue, queueStatusRef, setOrderForm, updateOrderFormPayment, id]
    )

    const setPaymentField = useCallback(
      async (paymentField: Partial<PaymentInput>) => {
        const newPayment = {
          ...payment,
          ...paymentField,
        }

        const paymentStatusUpdated = await setOrderPayment({
          payments: [newPayment],
        })

        if (!paymentStatusUpdated.success) {
          log({
            type: 'Error',
            level: 'Critical',
            event: {
              paymentField,
              success: paymentStatusUpdated.success,
              orderFormId: id,
            },
            workflowInstance: 'payment-field-not-updated',
          })
        }

        return paymentStatusUpdated
      },
      [payment, setOrderPayment, log, id]
    )

    const contextValue = useMemo(
      () => ({
        setPaymentField,
        paymentSystems,
        installmentOptions,
        availableAccounts,
        payment,
        value,
        interestValue,
        referenceValue,
        cardLastDigits,
        setCardLastDigits,
        paymentsValid,
        setCardFormFilled,
        isFreePurchase,
      }),
      [
        setPaymentField,
        paymentSystems,
        installmentOptions,
        availableAccounts,
        payment,
        value,
        interestValue,
        referenceValue,
        cardLastDigits,
        paymentsValid,
        isFreePurchase,
      ]
    )

    return (
      <OrderPaymentContext.Provider value={contextValue}>
        {children}
      </OrderPaymentContext.Provider>
    )
  }

  return { OrderPaymentProvider }
}

export const useOrderPayment = () => {
  const context = useContext(OrderPaymentContext)

  if (context === undefined) {
    throw new Error(
      'useOrderPayment must be used within a OrderPaymentProvider'
    )
  }

  return context
}
