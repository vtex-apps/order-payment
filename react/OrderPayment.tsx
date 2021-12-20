import { useCallback } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useQueueStatus, useOrderQueue } from 'vtex.order-manager/OrderQueue'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
} from '@vtex/checkout-types'

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

const { OrderPaymentProvider } = createOrderPaymentProvider<CheckoutOrderForm>({
  useLogger,
  useOrderQueue,
  useOrderForm,
  useUpdateOrderFormPayment,
  useQueueStatus,
})

export { useOrderPayment, OrderPaymentProvider }
export default { useOrderPayment, OrderPaymentProvider }
