import React, { createContext, ReactNode, useContext } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { cardSessionId as CardSessionIdQuery } from 'vtex.checkout-resources/Queries'
import { savePaymentToken as SavePaymentTokenMutation } from 'vtex.checkout-resources/Mutations'
import { saveCards as SaveCardsMutation } from 'vtex.checkout-resources/Mutations'

interface Context {
  savePaymentData: (paymentData: any) => any
}

interface OrderPaymentProps {
  children: ReactNode
}

const OrderPaymentContext = createContext<Context | undefined>(undefined)

export const OrderPaymentProvider = ({ children }: OrderPaymentProps) => {
  const { data: cardSessionData, refetch } = useQuery(CardSessionIdQuery)

  const [saveCardsMutation] = useMutation(SaveCardsMutation)
  const [savePaymentTokenMutation] = useMutation(SavePaymentTokenMutation)

  const savePaymentData = async (paymentData: any) => {
    try {
      const {
        data: { saveCards },
      } = await saveCardsMutation({
        variables: {
          paymentData,
          cardSessionId: cardSessionData.getCardSessionId,
        },
      })

      const { paymentTokens } = saveCards

      await savePaymentTokenMutation({
        variables: {
          paymentTokens,
        },
      })

      return paymentTokens
    } catch (err) {
      refetch()
      return {
        error: 'apiError',
      }
    }
  }
  return (
    <OrderPaymentContext.Provider value={{ savePaymentData }}>
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
