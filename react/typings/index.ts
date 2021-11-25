export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  AttachmentSchema: any
  AttachmentContent: any
  MatchedParameters: any
  OfferingInfo: any
}

export interface AvailableAccount {
  __typename?: 'AvailableAccount'
  accountId: Scalars['String']
  paymentSystem: Scalars['String']
  paymentSystemName: Scalars['String']
  cardNumber: Scalars['String']
  bin: Scalars['String']
}

export interface BusinessHour {
  __typename?: 'BusinessHour'
  dayNumber: Scalars['String']
  closed: Scalars['Boolean']
  closingTime: Scalars['String']
  openingTime: Scalars['String']
}

export interface CurrencyFormatInfo {
  __typename?: 'CurrencyFormatInfo'
  currencyDecimalDigits?: Maybe<Scalars['Int']>
  currencyDecimalSeparator?: Maybe<Scalars['String']>
  currencyGroupSeparator?: Maybe<Scalars['String']>
  startsWithCurrencySymbol?: Maybe<Scalars['Boolean']>
}

export interface Installment {
  __typename?: 'Installment'
  count: Scalars['Int']
  hasInterestRate?: Maybe<Scalars['Boolean']>
  interestRate?: Maybe<Scalars['Int']>
  value?: Maybe<Scalars['Float']>
  total: Scalars['Float']
}

export interface InstallmentOption {
  __typename?: 'InstallmentOption'
  paymentSystem: Scalars['String']
  bin?: Maybe<Scalars['String']>
  paymentName?: Maybe<Scalars['String']>
  paymentGroupName?: Maybe<Scalars['String']>
  value: Scalars['Float']
  installments: Installment[]
}

export interface Message {
  __typename?: 'Message'
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

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
  storePreferencesData?: Maybe<StorePreferencesData>
}

export interface OrderFormMessages {
  __typename?: 'OrderFormMessages'
  couponMessages: Message[]
  generalMessages: Message[]
}

export interface Payment {
  __typename?: 'Payment'
  paymentSystem?: Maybe<Scalars['String']>
  bin?: Maybe<Scalars['String']>
  accountId?: Maybe<Scalars['String']>
  tokenId?: Maybe<Scalars['String']>
  installments?: Maybe<Scalars['Int']>
  referenceValue?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Float']>
}

export interface PaymentData {
  __typename?: 'PaymentData'
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
  availableAccounts: AvailableAccount[]
  isValid: Scalars['Boolean']
}

export interface PaymentDataInput {
  payments: PaymentInput[]
}

export interface PaymentInput {
  hasDefaultBillingAddress?: Maybe<Scalars['Boolean']>
  installmentsInterestRate?: Maybe<Scalars['Int']>
  paymentSystem?: Maybe<Scalars['String']>
  bin?: Maybe<Scalars['String']>
  accountId?: Maybe<Scalars['String']>
  tokenId?: Maybe<Scalars['String']>
  installments?: Maybe<Scalars['Int']>
  referenceValue?: Maybe<Scalars['Int']>
  value?: Maybe<Scalars['Int']>
}

export interface PaymentSystem {
  __typename?: 'PaymentSystem'
  id: Scalars['String']
  name: Scalars['String']
  groupName: Scalars['String']
  validator?: Maybe<Validator>
  stringId: Scalars['String']
  requiresDocument: Scalars['Boolean']
  isCustom: Scalars['Boolean']
  description?: Maybe<Scalars['String']>
  requiresAuthentication?: Maybe<Scalars['Boolean']>
  dueDate?: Maybe<Scalars['String']>
}

export interface PaymentToken {
  creditCardToken: Scalars['String']
  paymentSystem: Scalars['String']
}

export interface PriceTag {
  __typename?: 'PriceTag'
  identifier?: Maybe<Scalars['String']>
  isPercentual?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  ratesAndBenefitsIdentifier?: Maybe<RatesAndBenefitsIdentifier>
  rawValue?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Int']>
}

export interface RatesAndBenefitsIdentifier {
  __typename?: 'RatesAndBenefitsIdentifier'
  description?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  matchedParameters?: Maybe<Scalars['MatchedParameters']>
  name?: Maybe<Scalars['String']>
}

export interface StorePreferencesData {
  __typename?: 'StorePreferencesData'
  countryCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  timeZone?: Maybe<Scalars['String']>
  currencyFormatInfo?: Maybe<CurrencyFormatInfo>
  currencySymbol?: Maybe<Scalars['String']>
}

export interface Totalizer {
  __typename?: 'Totalizer'
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  value: Scalars['Float']
}

export interface Validator {
  __typename?: 'Validator'
  regex?: Maybe<Scalars['String']>
  mask?: Maybe<Scalars['String']>
  cardCodeRegex?: Maybe<Scalars['String']>
  cardCodeMask?: Maybe<Scalars['String']>
  weights?: Maybe<Array<Maybe<Scalars['Int']>>>
  useCvv?: Maybe<Scalars['Boolean']>
  useExpirationDate?: Maybe<Scalars['Boolean']>
  useCardHolderName?: Maybe<Scalars['Boolean']>
  useBillingAddress?: Maybe<Scalars['Boolean']>
}
