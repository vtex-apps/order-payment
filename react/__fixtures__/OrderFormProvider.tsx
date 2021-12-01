import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { createOrderFormProvider } from '@vtex/order-manager'

import { mockOrderForm } from './orderForm'
// import QueryOrderForm from './QueryOrderForm'

export const QueryOrderForm = gql`
  query MockQuery {
    orderForm {
      id
      items
      canEditData
      clientProfileData {
        email
        firstName
        lastName
      }
      value
    }
  }
`

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
