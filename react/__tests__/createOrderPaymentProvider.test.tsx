import React, { FC } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import {
  useOrderForm,
  useOrderQueue,
  useQueueStatus,
  OrderQueueProvider,
} from '@vtex/order-manager'

import {
  OrderFormProvider,
  QueryOrderForm,
} from '../__fixtures__/OrderFormProvider'
import {
  createOrderPaymentProvider,
  useOrderPayment,
} from '../components/createOrderPaymentProvider'

const createWrapperOrderProviders = () => {
  function useUpdateOrderFormPayment() {
    return {
      updateOrderFormPayment: new Promise(resolve => {
        resolve(true)
      }),
    }
  }

  function useLogger() {
    const log = ({
      type,
      level,
      event,
      workflowType,
      workflowInstance,
    }: Record<string, string>) => {
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

  const Wrapper: FC = ({ children }) => {
    return (
      <OrderQueueProvider>
        <OrderFormProvider>
          <OrderPaymentProvider>{children}</OrderPaymentProvider>
        </OrderFormProvider>
      </OrderQueueProvider>
    )
  }

  return { Wrapper }
}

describe('OrderPayment', () => {
  it('should throw an error if theres no OrderPaymentProvider on the tree', () => {
    const {
      result: { error },
    } = renderHook(() => useOrderPayment())

    expect(error).not.toBeNull()
    expect(error.message).toEqual(
      'useOrderPayment must be used within a OrderPaymentProvider'
    )
  })

  it('should render hook!', () => {
    const { Wrapper } = createWrapperOrderProviders()
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>

    const { result } = renderHook(() => useOrderPayment(), { wrapper })

    // console.log(result.error)
    expect(result).not.toBeNull()
  })
})
