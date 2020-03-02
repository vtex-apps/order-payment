import React, { createContext, ReactNode, useContext } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import CardSessionIdQuery from 'vtex.checkout-resources/QueryCardSessionId'
import SavePaymentTokenMutation from 'vtex.checkout-resources/MutationSavePaymentToken'
import SaveCardsMutation from 'vtex.checkout-resources/MutationSaveCards'

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

interface Context {
  savePaymentData: (paymentData: PaymentData[]) => Promise<Status>
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

export const OrderPaymentProvider = ({ children }: OrderPaymentProps) => {
  const { data: cardSessionData, refetch } = useQuery(CardSessionIdQuery)

  const [saveCardsMutation] = useMutation(SaveCardsMutation)
  const [savePaymentTokenMutation] = useMutation(SavePaymentTokenMutation)

  const savePaymentData = async (
    paymentData: PaymentData[]
  ): Promise<Status> => {
    try {
      const {
        data: { saveCards },
      } = await saveCardsMutation({
        variables: {
          paymentData,
          cardSessionId: cardSessionData.getCardSessionId,
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
      refetch()

      return {
        error: true,
        value: 'apiError',
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
