import React, {
  createContext,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useMutation } from 'react-apollo'
import MutationUpdateOrderFormPayment from 'vtex.checkout-resources/MutationUpdateOrderFormPayment'
import { OrderQueue, OrderForm } from 'vtex.order-manager'
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
  OrderPaymentProvider,
  useOrderPayment,
} from './components/OrderPayments'

const { useOrderForm } = OrderForm
const { useOrderQueue, useQueueStatus, QueueStatus } = OrderQueue

interface UpdateOrderFormPaymentMutation {
  updateOrderFormPayment: CheckoutOrderForm
}

interface UpdateOrderFormPaymentMutationVariables {
  paymentData: PaymentDataInput
}

interface Context {
  setPaymentField: (
    paymentField: Partial<PaymentInput>
  ) => Promise<{ success: boolean }>
  paymentSystems: PaymentSystem[]
  availableAccounts: AvailableAccount[]
  installmentOptions: InstallmentOption[]
  payment: Payment
  referenceValue: number
  value: number
  interestValue: number
  cardLastDigits: string
  setCardLastDigits: (cardDigits: string) => void
  paymentsValid: boolean
  setCardFormFilled: (filled: boolean) => void
  isFreePurchase: boolean
}

export default { useOrderPayment, OrderPaymentProvider }
