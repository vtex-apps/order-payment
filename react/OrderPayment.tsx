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

interface CardFormData {
  encryptedCardNumber: string
  encryptedCardHolder: string
  encryptedExpiryDate: string
  encryptedCsc: string
  lastDigits: string
}

interface Context {
  setPaymentField: (
    paymentField: Partial<PaymentInput>
  ) => Promise<{ success: boolean }>
  cardFormData: CardFormData | null
  setCardFormData: React.Dispatch<React.SetStateAction<CardFormData | null>>
  paymentSystems: PaymentSystem[]
  availableAccounts: AvailableAccount[]
  installmentOptions: InstallmentOption[]
  payment: Payment
  referenceValue: number
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

  const {
    totalizers,
    paymentData: {
      paymentSystems,
      availableAccounts,
      installmentOptions,
      payments,
    },
  } = orderForm
  const referenceValue = totalizers[0]!.value
  const payment = payments[0] || {}

  const [cardFormData, setCardFormData] = useState<CardFormData | null>(null)

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

  const value = useMemo(
    () => ({
      setPaymentField,
      cardFormData,
      setCardFormData,
      paymentSystems,
      installmentOptions,
      availableAccounts,
      payment,
      referenceValue,
    }),
    [
      availableAccounts,
      cardFormData,
      installmentOptions,
      payment,
      paymentSystems,
      referenceValue,
      setPaymentField,
    ]
  )

  return (
    <OrderPaymentContext.Provider value={value}>
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
