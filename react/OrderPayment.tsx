import React, { createContext, ReactNode, useContext } from 'react'

//import { useOrderForm } from 'vtex.order-manager/OrderForm'

interface Context {
  getCardSessionId: () => string
}

interface OrderPaymentProps {
  children: ReactNode
}

const OrderPaymentContext = createContext<Context | undefined>(undefined)

export const OrderPaymentProvider = ({ children }: OrderPaymentProps) => {

  const getCardSessionId = () => '5f1fe23b-9fd1-417d-a4aa-14df38e7746e-637147976911429634'

  return (
    <OrderPaymentContext.Provider value={{ getCardSessionId }}>
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