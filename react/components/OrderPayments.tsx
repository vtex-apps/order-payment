import { useCallback } from 'react'
import { OrderQueue, OrderForm } from 'vtex.order-manager'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import {
  OrderForm as CheckoutOrderForm,
  PaymentDataInput,
  PaymentSystem,
  InstallmentOption,
  AvailableAccount,
  Payment,
  PaymentInput,
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
const { useOrderQueue, useQueueStatus, QueueStatus } = OrderQueue

function useUpdateOrderFormPayment() {
  const [updateOrderFormPayment] = useMutation<
    UpdateOrderFormPaymentMutation,
    UpdateOrderFormPaymentMutationVariables
  >(MutationUpdateOrderFormPayment)

  return {
    updateOrderFormPayment: useCallback(
      async (paymentData: PaymentDataInput, orderFormId: string) => {
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
