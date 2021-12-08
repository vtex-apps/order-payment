import { useCallback } from 'react'
import { OrderQueue, OrderForm } from 'vtex.order-manager'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
} from 'vtex.checkout-graphql'
// import { useOrderForm } from '@vtex/order-manager'

import {
  createOrderPaymentProvider,
  useOrderPayment,
} from './components/createOrderPaymentProvider'
import { useLogger } from './utils/logger'

interface UpdateOrderFormPaymentMutation {
  updateOrderFormPayment: CheckoutOrderForm
}

interface UpdateOrderFormPaymentMutationVariables {
  paymentData: PaymentDataInput
}

const { useOrderForm } = OrderForm
const { useQueueStatus, useOrderQueue } = OrderQueue

function useUpdateOrderFormPayment() {
  const [updateOrderFormPayment] = useMutation<
    UpdateOrderFormPaymentMutation,
    UpdateOrderFormPaymentMutationVariables
  >(MutationUpdateOrderFormPayment)

  return {
    updateOrderFormPayment: useCallback(
      async (paymentData: PaymentDataInput) => {
        const { data } = await updateOrderFormPayment({
          variables: { paymentData },
        })

        const newOrderForm = data!.updateOrderFormPayment

        return newOrderForm
      },
      [updateOrderFormPayment]
    ),
  }
}

const { OrderPaymentProvider } = createOrderPaymentProvider({
  useLogger,
  useOrderQueue,
  useOrderForm,
  useUpdateOrderFormPayment,
  useQueueStatus,
})

export { useOrderPayment, OrderPaymentProvider }
export default { useOrderPayment, OrderPaymentProvider }
