import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { useQuery, useMutation } from 'react-apollo'
import CardSessionIdQuery from 'vtex.checkout-resources/QueryCardSessionId'
import SavePaymentTokenMutation from 'vtex.checkout-resources/MutationSavePaymentToken'
import SaveCardsMutation from 'vtex.checkout-resources/MutationSaveCards'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import {
  useOrderQueue,
  useQueueStatus,
  QueueStatus,
} from 'vtex.order-manager/OrderQueue'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { OrderForm, PaymentDataInput } from 'vtex.checkout-graphql'

interface Address {
  postalCode: string
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  number: string
  complement: string
}

interface PaymentData {
  paymentSystem: string
  cardHolder: string
  cardNumber: string
  expiryDate: string
  csc: string
  document: string
  documentType: string
  partnerId: string
  address: Address
}

interface TokenizedCard {
  token: string
  bin: string
  lastDigits: string
  expiresAt: string
  paymentSystem: number
  paymentSystemName: string
}

interface PaymentToken {
  creditCardToken: string
  paymentSystem: string
}

interface Status {
  error: boolean
  value: TokenizedCard[] | string
}

interface UpdateOrderFormPaymentMutation {
  updateOrderFormPayment: OrderForm
}

interface UpdateOrderFormPaymentMutationVariables {
  paymentData: PaymentDataInput
}

interface Context {
  savePaymentData: (paymentData: PaymentData[]) => Promise<Status>
  setOrderPayment: (
    paymentData: PaymentDataInput
  ) => Promise<{ success: boolean }>
}

interface OrderPaymentProps {
  children: ReactNode
}

const getPaymentTokens = (tokenizedCards: TokenizedCard[]): PaymentToken[] =>
  tokenizedCards.map(tokenizedCard => ({
    creditCardToken: tokenizedCard.token,
    paymentSystem: `${tokenizedCard.paymentSystem}`,
  }))

const OrderPaymentContext = createContext<Context | undefined>(undefined)

const SET_PAYMENT_TASK = 'SetPaymentTask'

export const OrderPaymentProvider: React.FC<OrderPaymentProps> = ({
  children,
}: OrderPaymentProps) => {
  const { data: cardSession, refetch: refreshCardSession } = useQuery(
    CardSessionIdQuery
  )

  const [saveCardsMutation] = useMutation(SaveCardsMutation)
  const [savePaymentTokenMutation] = useMutation(SavePaymentTokenMutation)

  const { enqueue, listen } = useOrderQueue()
  const { setOrderForm } = useOrderForm()

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

        const orderForm = data!.updateOrderFormPayment

        return orderForm
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

  const savePaymentData = useCallback(
    async (paymentData: PaymentData[]): Promise<Status> => {
      try {
        const {
          data: { saveCards },
        } = await saveCardsMutation({
          variables: {
            paymentData,
            cardSessionId: cardSession.getCardSessionId,
          },
        })

        const { tokenizedCards } = saveCards

        await savePaymentTokenMutation({
          variables: {
            paymentTokens: getPaymentTokens(tokenizedCards),
          },
        })

        return {
          error: false,
          value: tokenizedCards,
        }
      } catch (err) {
        refreshCardSession()

        return {
          error: true,
          value: 'apiError',
        }
      }
    },
    [
      cardSession,
      refreshCardSession,
      saveCardsMutation,
      savePaymentTokenMutation,
    ]
  )

  const value = useMemo(() => ({ savePaymentData, setOrderPayment }), [
    savePaymentData,
    setOrderPayment,
  ])

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
