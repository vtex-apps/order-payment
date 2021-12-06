import { createOrderFormProvider } from '@vtex/order-manager'

import { mockOrderForm } from './orderForm'

function useToast() {
  return {
    showToast: () => {},
    toastState: {
      isToastVisible: false,
    },
  }
}

function useClearOrderFormMessages() {
  return () =>
    new Promise(resolve => {
      resolve(true)
    })
}

const useGetOrderForm = () => {
  return () =>
    new Promise(resolve => {
      resolve(true)
    })
}

const { OrderFormProvider } = createOrderFormProvider({
  useToast,
  useClearOrderFormMessages,
  useGetOrderForm,
  defaultOrderForm: mockOrderForm,
})

export { OrderFormProvider }
