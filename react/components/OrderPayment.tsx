import { useCallback } from 'react'
import { OrderQueue, OrderForm } from 'vtex.order-manager'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
} from 'vtex.checkout-graphql'

import {
  createOrderPaymentProvider,
  useOrderPayment,
  LogFn,
} from './createOrderPaymentProvider'

interface UpdateOrderFormPaymentMutation {
  updateOrderFormPayment: CheckoutOrderForm
}

interface UpdateOrderFormPaymentMutationVariables {
  paymentData: PaymentDataInput
}

const { useOrderForm } = OrderForm
const { useOrderQueue, useQueueStatus } = OrderQueue

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

export function useLogger() {
  const log: LogFn = ({
    type,
    level,
    event,
    workflowType,
    workflowInstance,
  }) => {
    // eslint-disable-next-line no-console
    console.log({ type, level, event, workflowType, workflowInstance })
  }

  return { log }
}

const { OrderPaymentProvider } = createOrderPaymentProvider({
  useLogger,
  useOrderQueue,
  useOrderForm,
  useUpdateOrderFormPayment,
  useQueueStatus,
})

export { OrderPaymentProvider, useOrderPayment }
