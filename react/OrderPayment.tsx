import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import { OrderQueue, OrderForm } from 'vtex.order-manager'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
  PaymentSystem,
  InstallmentOption,
  AvailableAccount,
  Payment,
  PaymentInput,
} from 'vtex.checkout-graphql'

const { useOrderForm } = OrderForm
const { useOrderQueue, useQueueStatus, QueueStatus } = OrderQueue

interface UpdateOrderFormPaymentMutation {
  updateOrderFormPayment: CheckoutOrderForm
}

interface UpdateOrderFormPaymentMutationVariables {
  paymentData: PaymentDataInput
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

interface OrderPaymentProps {
  children: ReactNode
}

const OrderPaymentContext = createContext<Context | undefined>(undefined)

const SET_PAYMENT_TASK = 'SetPaymentTask'

export const OrderPaymentProvider: React.FC<OrderPaymentProps> = ({
  children,
}: OrderPaymentProps) => {
  const { enqueue, listen } = useOrderQueue()
  const { orderForm, setOrderForm } = useOrderForm()
  const [cardLastDigits, setCardLastDigits] = useState('')
  const [cardFormFilled, setCardFormFilled] = useState(false)

  const {
    totalizers,
    paymentData: {
      paymentSystems,
      availableAccounts,
      installmentOptions,
      payments,
    },
  } = orderForm

  const referenceValue =
    totalizers?.reduce((total, totalizer) => {
      if (totalizer?.id === 'Tax' || totalizer?.id === 'interest') {
        return total
      }

      return total + (totalizer?.value ?? 0)
    }, 0) ?? 0

  const value =
    payments?.reduce((total, payment) => total + (payment?.value ?? 0), 0) ?? 0

  const interestValue =
    payments?.reduce(
      (total, payment) =>
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
        .map(p => p.paymentSystem)
        .map(paymentSystem =>
          paymentSystems.find(ps => ps.id === paymentSystem)
        )
        .some(
          paymentSystem => paymentSystem?.groupName === 'creditCardPaymentGroup'
        )
    ) {
      return cardFormFilled && payments.every(p => p.installments != null)
    }

    return true
  }, [cardFormFilled, paymentSystems, payments])

  const queueStatusRef = useQueueStatus(listen)

  const [updateOrderFormPayment] = useMutation<
    UpdateOrderFormPaymentMutation,
    UpdateOrderFormPaymentMutationVariables
  >(MutationUpdateOrderFormPayment)

  const setOrderPayment = useCallback(
    async (paymentData: PaymentDataInput) => {
      const task = async () => {
        const { data } = await updateOrderFormPayment({
          variables: { paymentData },
        })

        const newOrderForm = data!.updateOrderFormPayment

        return newOrderForm
      }

      try {
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
    [enqueue, queueStatusRef, setOrderForm, updateOrderFormPayment]
  )

  const setPaymentField = useCallback(
    (paymentField: Partial<PaymentInput>) => {
      const newPayment = {
        ...payment,
        ...paymentField,
      }
      return setOrderPayment({
        payments: [newPayment],
      })
    },
    [payment, setOrderPayment]
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
      isFreePurchase
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
      isFreePurchase
    ]
  )

  return (
    <OrderPaymentContext.Provider value={contextValue}>
      {children}
    </OrderPaymentContext.Provider>
  )
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

export default { useOrderPayment, OrderPaymentProvider }
