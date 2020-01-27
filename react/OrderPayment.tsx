import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { cardSessionId as CardSessionIdQuery } from 'vtex.checkout-resources/Queries'
import { savePaymentToken as SavePaymentToken } from 'vtex.checkout-resources/Mutations'
import { PaymentToken } from 'vtex.checkout-graphql'

//import { useOrderForm } from 'vtex.order-manager/OrderForm'

interface Context {
  getCardSessionId: () => any
  cardSessionId: string
  savePayment: (paymentTokens: PaymentToken[]) => any
}

interface OrderPaymentProps {
  children: ReactNode
}

const OrderPaymentContext = createContext<Context | undefined>(undefined)

export const OrderPaymentProvider = ({ children }: OrderPaymentProps) => {
  const [savePaymentToken] = useMutation(SavePaymentToken)

  function savePayment(paymentTokens: PaymentToken[]) {
    return savePaymentToken({ variables: { paymentTokens } })
  }

  const [cardSessionId, setCardSessionId] = useState<string>('')

  const { client, loading: loadingQuery, data, refetch } = useQuery(
    CardSessionIdQuery
  )

  const getCardSessionId = () => refetch()

  useEffect(() => {
    if (loadingQuery) {
      return
    }

    if (data) {
      setCardSessionId(data.getCardSessionId)
    }
  }, [client, loadingQuery, data])

  return (
    <OrderPaymentContext.Provider
      value={{ getCardSessionId, cardSessionId, savePayment }}
    >
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

export default { OrderPaymentProvider, useOrderPayment }
