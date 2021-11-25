export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }

export interface OrderForm {
  id: Scalars['ID']
  items: unknown[]
  canEditData: Scalars['Boolean']
  loggedIn: Scalars['Boolean']
  userProfileId?: Maybe<Scalars['String']>
  userType?: Maybe<unknown>
  shipping: unknown
  marketingData: unknown
  totalizers: Totalizer[]
  value: Scalars['Float']
  messages: OrderFormMessages
  paymentData: PaymentData
  clientProfileData?: Maybe<unknown>
  clientPreferencesData?: Maybe<unknown>
  allowManualPrice?: Maybe<Scalars['Boolean']>
  openTextField?: Maybe<unknown>
  storePreferencesData?: Maybe<unknown>
}
export interface OrderFormMessages {
  couponMessages: Message[]
  generalMessages: Message[]
}

export interface Message {
  code?: string
  status?: string
  text?: string
}

export interface PaymentData {
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
  availableAccounts: AvailableAccount[]
  isValid: boolean
}

export interface AvailableAccount {
  accountId: string
  paymentSystem: string
  paymentSystemName: string
  cardNumber: string
  bin: string
}

export interface InstallmentOption {
  paymentSystem: string
  bin?: string
  paymentName?: string
  paymentGroupName?: string
  value: number
  installments: unknown[]
}

export interface Payment {
  paymentSystem?: Maybe<Scalars['String']>
  bin?: Maybe<Scalars['String']>
  accountId?: Maybe<Scalars['String']>
  tokenId?: Maybe<Scalars['String']>
  installments?: Maybe<Scalars['Int']>
  referenceValue?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Float']>
}

export type PaymentInput = {
  hasDefaultBillingAddress?: boolean
  installmentsInterestRate?: number
} & Payment

export interface PaymentSystem {
  id: Scalars['String']
  name: Scalars['String']
  groupName: Scalars['String']
  validator?: Maybe<unknown>
  stringId: Scalars['String']
  requiresDocument: Scalars['Boolean']
  isCustom: Scalars['Boolean']
  description?: Maybe<Scalars['String']>
  requiresAuthentication?: Maybe<Scalars['Boolean']>
  dueDate?: Maybe<Scalars['String']>
}

export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  AttachmentSchema: any
  AttachmentContent: any
  InputValues: any
  /**
   * ProductCategoriesObject is a Record<string, string>, in the following format:
   * { '<categoryNumber>': '<categoryName>' }
   */
  ProductCategoriesObject: any
  MatchedParameters: any
  OfferingInfo: any
  IOSanitizedString: any
  IOUpload: any
  Upload: any
}

export interface Totalizer {
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  value: Scalars['Float']
}

export interface PaymentDataInput {
  payments: PaymentInput[]
}
