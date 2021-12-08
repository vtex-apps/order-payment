export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type AddedOptionItem = {
  __typename?: 'AddedOptionItem'
  item?: Maybe<Item>
  compositionItem?: Maybe<CompositionItem>
  normalizedQuantity?: Maybe<Scalars['Int']>
  choiceType?: Maybe<Scalars['String']>
  extraQuantity?: Maybe<Scalars['Int']>
}

export type Address = {
  __typename?: 'Address'
  addressId?: Maybe<Scalars['ID']>
  addressType?: Maybe<AddressType>
  city?: Maybe<Scalars['String']>
  complement?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  geoCoordinates?: Maybe<Array<Maybe<Scalars['Float']>>>
  neighborhood?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  receiverName?: Maybe<Scalars['String']>
  reference?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  isDisposable?: Maybe<Scalars['Boolean']>
}

export type AddressInput = {
  addressId?: Maybe<Scalars['ID']>
  addressType?: Maybe<AddressType>
  addressQuery?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  complement?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  geoCoordinates?: Maybe<Array<Maybe<Scalars['Float']>>>
  neighborhood?: Maybe<Scalars['String']>
  number?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  receiverName?: Maybe<Scalars['String']>
  reference?: Maybe<Scalars['String']>
  state?: Maybe<Scalars['String']>
  street?: Maybe<Scalars['String']>
  isDisposable?: Maybe<Scalars['Boolean']>
}

export type AddressType =
  | 'residential'
  | 'commercial'
  | 'inStore'
  | 'giftRegistry'
  | 'pickup'
  | 'search'

export type AssemblyOptionInput = {
  assemblyId: Scalars['String']
  id?: Maybe<Scalars['ID']>
  quantity?: Maybe<Scalars['Int']>
  seller?: Maybe<Scalars['String']>
  inputValues?: Maybe<Scalars['InputValues']>
  options?: Maybe<AssemblyOptionInput[]>
}

export type AssemblyOptionItem = {
  __typename?: 'AssemblyOptionItem'
  added: Array<Maybe<AddedOptionItem>>
  removed: Array<Maybe<RemovedOptionItem>>
  parentPrice?: Maybe<Scalars['Float']>
}

export type AssemblyOptionType = {
  __typename?: 'AssemblyOptionType'
  assemblyId: Scalars['String']
  id?: Maybe<Scalars['ID']>
  quantity?: Maybe<Scalars['Int']>
  seller?: Maybe<Scalars['String']>
  inputValues?: Maybe<Scalars['InputValues']>
  options?: Maybe<AssemblyOptionType[]>
}

export type Attachment = {
  __typename?: 'Attachment'
  name?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['AttachmentContent']>
}

export type AttachmentOffering = {
  __typename?: 'AttachmentOffering'
  name?: Maybe<Scalars['String']>
  required?: Maybe<Scalars['Boolean']>
  schema?: Maybe<Scalars['AttachmentSchema']>
}

export type AvailableAccount = {
  __typename?: 'AvailableAccount'
  accountId: Scalars['String']
  paymentSystem: Scalars['String']
  paymentSystemName: Scalars['String']
  cardNumber: Scalars['String']
  bin: Scalars['String']
}

export type BundleItemAttachmentInput = {
  itemIndex: Scalars['Int']
  bundleItemId: Scalars['String']
  attachmentName: Scalars['String']
  attachmentContent: Scalars['AttachmentContent']
}

export type BusinessHour = {
  __typename?: 'BusinessHour'
  dayNumber: Scalars['String']
  closed: Scalars['Boolean']
  closingTime: Scalars['String']
  openingTime: Scalars['String']
}

export type CheckoutProfile = {
  __typename?: 'CheckoutProfile'
  userProfileId?: Maybe<Scalars['String']>
  profileProvider?: Maybe<Scalars['String']>
  availableAccounts: AvailableAccount[]
  availableAddresses: Address[]
  userProfile?: Maybe<UserProfile>
}

export type ClientData = {
  __typename?: 'ClientData'
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  document?: Maybe<Scalars['String']>
  documentType?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  corporateName?: Maybe<Scalars['String']>
  tradeName?: Maybe<Scalars['String']>
  corporateDocument?: Maybe<Scalars['String']>
  stateInscription?: Maybe<Scalars['String']>
  corporatePhone?: Maybe<Scalars['String']>
  isCorporate?: Maybe<Scalars['Boolean']>
  profileCompleteOnLoading?: Maybe<Scalars['Boolean']>
  profileErrorOnLoading?: Maybe<Scalars['Boolean']>
  customerClass?: Maybe<Scalars['String']>
  isValid: Scalars['Boolean']
}

export type ClientPreferencesData = {
  __typename?: 'ClientPreferencesData'
  locale?: Maybe<Scalars['String']>
  optInNewsletter?: Maybe<Scalars['Boolean']>
}

export type ClientPreferencesDataInput = {
  optInNewsletter?: Maybe<Scalars['Boolean']>
  locale?: Maybe<Scalars['String']>
}

export type CompositionItem = {
  __typename?: 'CompositionItem'
  id?: Maybe<Scalars['ID']>
  minQuantity?: Maybe<Scalars['Int']>
  maxQuantity?: Maybe<Scalars['Int']>
  initialQuantity?: Maybe<Scalars['Int']>
  priceTable?: Maybe<Scalars['String']>
  seller?: Maybe<Scalars['String']>
}

export type Coupon = {
  __typename?: 'Coupon'
  code?: Maybe<Scalars['String']>
}

export type CurrencyFormatInfo = {
  __typename?: 'CurrencyFormatInfo'
  currencyDecimalDigits?: Maybe<Scalars['Int']>
  currencyDecimalSeparator?: Maybe<Scalars['String']>
  currencyGroupSeparator?: Maybe<Scalars['String']>
  startsWithCurrencySymbol?: Maybe<Scalars['Boolean']>
}

export type DeliveryOption = {
  __typename?: 'DeliveryOption'
  id: Scalars['String']
  deliveryChannel: Scalars['String']
  price: Scalars['Int']
  estimate: Scalars['String']
  isSelected: Scalars['Boolean']
}

export type ImageUrls = {
  __typename?: 'ImageUrls'
  at1x: Scalars['String']
  at2x: Scalars['String']
  at3x: Scalars['String']
}

export type Installment = {
  __typename?: 'Installment'
  count: Scalars['Int']
  hasInterestRate?: Maybe<Scalars['Boolean']>
  interestRate?: Maybe<Scalars['Int']>
  value?: Maybe<Scalars['Float']>
  total: Scalars['Float']
}

export type InstallmentOption = {
  __typename?: 'InstallmentOption'
  paymentSystem: Scalars['String']
  bin?: Maybe<Scalars['String']>
  paymentName?: Maybe<Scalars['String']>
  paymentGroupName?: Maybe<Scalars['String']>
  value: Scalars['Float']
  installments: Installment[]
}

export type Item = {
  __typename?: 'Item'
  additionalInfo?: Maybe<ItemAdditionalInfo>
  assemblyOptions?: Maybe<AssemblyOptionItem>
  availability?: Maybe<Scalars['String']>
  attachmentOfferings: AttachmentOffering[]
  attachments: Attachment[]
  bundleItems: Item[]
  detailUrl?: Maybe<Scalars['String']>
  id: Scalars['ID']
  imageUrls?: Maybe<ImageUrls>
  listPrice?: Maybe<Scalars['Float']>
  manualPrice?: Maybe<Scalars['Float']>
  measurementUnit?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  offerings: Offering[]
  options?: Maybe<Array<Maybe<AssemblyOptionType>>>
  parentAssemblyBinding?: Maybe<Scalars['String']>
  parentItemIndex?: Maybe<Scalars['Int']>
  price?: Maybe<Scalars['Float']>
  productCategories?: Maybe<Scalars['ProductCategoriesObject']>
  productCategoryIds?: Maybe<Scalars['String']>
  /** Id of the product. Can be null if included inside bundle items. */
  productId?: Maybe<Scalars['String']>
  productRefId?: Maybe<Scalars['String']>
  quantity: Scalars['Float']
  refId?: Maybe<Scalars['String']>
  /** Product's seller. Can be null if included inside bundle items. */
  seller?: Maybe<Scalars['String']>
  sellingPrice?: Maybe<Scalars['Float']>
  sellingPriceWithAssemblies?: Maybe<Scalars['Float']>
  skuName?: Maybe<Scalars['String']>
  skuSpecifications: SkuSpecification[]
  uniqueId: Scalars['String']
  unitMultiplier?: Maybe<Scalars['Float']>
  priceTags: PriceTag[]
}

export type ItemAdditionalInfo = {
  __typename?: 'ItemAdditionalInfo'
  brandName?: Maybe<Scalars['String']>
}

export type ItemInput = {
  id?: Maybe<Scalars['Int']>
  index?: Maybe<Scalars['Int']>
  quantity?: Maybe<Scalars['Float']>
  seller?: Maybe<Scalars['ID']>
  uniqueId?: Maybe<Scalars['String']>
  inputValues?: Maybe<Scalars['InputValues']>
  options?: Maybe<Array<Maybe<AssemblyOptionInput>>>
}

export type ItemsOrdinationCriteria = 'name' | 'add_time'

export type ManualPriceInput = {
  itemIndex: Scalars['Int']
  price: Scalars['Float']
}

export type MarketingData = {
  __typename?: 'MarketingData'
  utmCampaign?: Maybe<Scalars['String']>
  utmMedium?: Maybe<Scalars['String']>
  utmSource?: Maybe<Scalars['String']>
  utmiCampaign?: Maybe<Scalars['String']>
  utmiPart?: Maybe<Scalars['String']>
  utmiPage?: Maybe<Scalars['String']>
  coupon?: Maybe<Scalars['String']>
  marketingTags?: Maybe<Array<Scalars['String']>>
}

export type MarketingDataInput = {
  utmCampaign?: Maybe<Scalars['String']>
  utmMedium?: Maybe<Scalars['String']>
  utmSource?: Maybe<Scalars['String']>
  utmiCampaign?: Maybe<Scalars['String']>
  utmiPart?: Maybe<Scalars['String']>
  utmiPage?: Maybe<Scalars['String']>
  coupon?: Maybe<Scalars['String']>
  marketingTags?: Maybe<Array<Scalars['String']>>
}

export type Message = {
  __typename?: 'Message'
  code?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  addToCart: OrderForm
  updateItems: OrderForm
  addItemOffering: OrderForm
  removeItemOffering: OrderForm
  addBundleItemAttachment: OrderForm
  removeBundleItemAttachment: OrderForm
  insertCoupon: OrderForm
  estimateShipping: OrderForm
  selectDeliveryOption: OrderForm
  selectPickupOption: OrderForm
  /**
   * Changes the currently selected address in the shipping data
   * of the OrderForm
   */
  updateSelectedAddress: OrderForm
  savePaymentToken?: Maybe<SavePaymentTokenPayload>
  updateOrderFormProfile: OrderForm
  updateClientPreferencesData: OrderForm
  updateOrderFormPayment: OrderForm
  setManualPrice: OrderForm
  updateItemsOrdination: OrderForm
  clearOrderFormMessages: OrderForm
  updateOrderFormOpenTextField: OrderForm
  updateOrderFormMarketingData: OrderForm
}

export type MutationAddToCartArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  items?: Maybe<Array<Maybe<ItemInput>>>
  marketingData?: Maybe<MarketingDataInput>
  salesChannel?: Maybe<Scalars['String']>
}

export type MutationUpdateItemsArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  orderItems?: Maybe<Array<Maybe<ItemInput>>>
  splitItem?: Maybe<Scalars['Boolean']>
}

export type MutationAddItemOfferingArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  offeringInput?: Maybe<OfferingInput>
}

export type MutationRemoveItemOfferingArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  offeringInput?: Maybe<OfferingInput>
}

export type MutationAddBundleItemAttachmentArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  bundleItemAttachmentInput?: Maybe<BundleItemAttachmentInput>
}

export type MutationRemoveBundleItemAttachmentArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  bundleItemAttachmentInput?: Maybe<BundleItemAttachmentInput>
}

export type MutationInsertCouponArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  text?: Maybe<Scalars['String']>
}

export type MutationEstimateShippingArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  address?: Maybe<AddressInput>
}

export type MutationSelectDeliveryOptionArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  deliveryOptionId?: Maybe<Scalars['String']>
}

export type MutationSelectPickupOptionArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  pickupOptionId?: Maybe<Scalars['String']>
  itemId?: Maybe<Scalars['String']>
}

export type MutationUpdateSelectedAddressArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: AddressInput
}

export type MutationSavePaymentTokenArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  paymentTokens?: Maybe<Array<Maybe<PaymentToken>>>
}

export type MutationUpdateOrderFormProfileArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: UserProfileInput
}

export type MutationUpdateClientPreferencesDataArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: ClientPreferencesDataInput
}

export type MutationUpdateOrderFormPaymentArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: PaymentDataInput
}

export type MutationSetManualPriceArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: ManualPriceInput
}

export type MutationUpdateItemsOrdinationArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  ascending: Scalars['Boolean']
  criteria: ItemsOrdinationCriteria
}

export type MutationClearOrderFormMessagesArgs = {
  orderFormId?: Maybe<Scalars['ID']>
}

export type MutationUpdateOrderFormOpenTextFieldArgs = {
  orderFormId?: Maybe<Scalars['ID']>
  input: OrderFormOpenTextInput
}

export type MutationUpdateOrderFormMarketingDataArgs = {
  input: MarketingDataInput
}

export type Offering = {
  __typename?: 'Offering'
  id: Scalars['String']
  name: Scalars['String']
  price: Scalars['Int']
  type: Scalars['String']
  attachmentOfferings: AttachmentOffering[]
}

export type OfferingInput = {
  itemIndex: Scalars['Int']
  offeringId: Scalars['String']
  offeringInfo?: Maybe<Scalars['OfferingInfo']>
}

export type OpenTextField = {
  __typename?: 'OpenTextField'
  value?: Maybe<Scalars['String']>
}

export type OrderForm = {
  __typename?: 'OrderForm'
  id: Scalars['ID']
  items: Item[]
  canEditData: Scalars['Boolean']
  loggedIn: Scalars['Boolean']
  userProfileId?: Maybe<Scalars['String']>
  userType?: Maybe<UserType>
  shipping: Shipping
  marketingData: MarketingData
  totalizers: Totalizer[]
  value: Scalars['Float']
  messages: OrderFormMessages
  paymentData: PaymentData
  clientProfileData?: Maybe<ClientData>
  clientPreferencesData?: Maybe<ClientPreferencesData>
  allowManualPrice?: Maybe<Scalars['Boolean']>
  openTextField?: Maybe<OpenTextField>
  storePreferencesData?: Maybe<StorePreferencesData>
}

export type OrderFormMessages = {
  __typename?: 'OrderFormMessages'
  couponMessages: Message[]
  generalMessages: Message[]
}

export type OrderFormOpenTextInput = {
  value?: Maybe<Scalars['String']>
}

export type Payment = {
  __typename?: 'Payment'
  paymentSystem?: Maybe<Scalars['String']>
  bin?: Maybe<Scalars['String']>
  accountId?: Maybe<Scalars['String']>
  tokenId?: Maybe<Scalars['String']>
  installments?: Maybe<Scalars['Int']>
  referenceValue?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Float']>
}

export type PaymentData = {
  __typename?: 'PaymentData'
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: Payment[]
  availableAccounts: AvailableAccount[]
  isValid: Scalars['Boolean']
}

export type PaymentDataInput = {
  payments: PaymentInput[]
}

export type PaymentInput = {
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

export type PaymentSystem = {
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

export type PaymentToken = {
  creditCardToken: Scalars['String']
  paymentSystem: Scalars['String']
}

export type PickupOption = {
  __typename?: 'PickupOption'
  id: Scalars['String']
  address: Address
  deliveryChannel: Scalars['String']
  price: Scalars['Int']
  estimate: Scalars['String']
  isSelected: Scalars['Boolean']
  friendlyName: Scalars['String']
  additionalInfo?: Maybe<Scalars['String']>
  storeDistance?: Maybe<Scalars['Float']>
  transitTime: Scalars['String']
  businessHours: BusinessHour[]
}

export type PriceTag = {
  __typename?: 'PriceTag'
  identifier?: Maybe<Scalars['String']>
  isPercentual?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  ratesAndBenefitsIdentifier?: Maybe<RatesAndBenefitsIdentifier>
  rawValue?: Maybe<Scalars['Float']>
  value?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  getCardSessionId?: Maybe<Scalars['String']>
  orderForm: OrderForm
  checkoutProfile?: Maybe<CheckoutProfile>
  shippingSLA?: Maybe<Shipping>
}

export type QueryOrderFormArgs = {
  orderFormId?: Maybe<Scalars['ID']>
}

export type QueryCheckoutProfileArgs = {
  email: Scalars['String']
}

export type QueryShippingSlaArgs = {
  items?: Maybe<Array<Maybe<ShippingItem>>>
  postalCode?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
}

export type RatesAndBenefitsIdentifier = {
  __typename?: 'RatesAndBenefitsIdentifier'
  description?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  matchedParameters?: Maybe<Scalars['MatchedParameters']>
  name?: Maybe<Scalars['String']>
}

export type RemovedOptionItem = {
  __typename?: 'RemovedOptionItem'
  initialQuantity?: Maybe<Scalars['Int']>
  removedQuantity?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
}

export type SavePaymentTokenPayload = {
  __typename?: 'SavePaymentTokenPayload'
  status?: Maybe<Scalars['String']>
}

export type Shipping = {
  __typename?: 'Shipping'
  countries?: Maybe<Array<Maybe<Scalars['String']>>>
  deliveryOptions: DeliveryOption[]
  pickupOptions: PickupOption[]
  selectedAddress?: Maybe<Address>
  availableAddresses?: Maybe<Array<Maybe<Address>>>
  isValid: Scalars['Boolean']
}

export type ShippingItem = {
  id?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['String']>
  seller?: Maybe<Scalars['String']>
}

export type SkuSpecification = {
  __typename?: 'SKUSpecification'
  fieldName?: Maybe<Scalars['String']>
  fieldValues: Array<Maybe<Scalars['String']>>
}

export type StorePreferencesData = {
  __typename?: 'StorePreferencesData'
  countryCode?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
  timeZone?: Maybe<Scalars['String']>
  currencyFormatInfo?: Maybe<CurrencyFormatInfo>
  currencySymbol?: Maybe<Scalars['String']>
}

export type Totalizer = {
  __typename?: 'Totalizer'
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  value: Scalars['Float']
}

export type UserProfile = {
  __typename?: 'UserProfile'
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  document?: Maybe<Scalars['String']>
  documentType?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  corporateName?: Maybe<Scalars['String']>
  tradeName?: Maybe<Scalars['String']>
  corporateDocument?: Maybe<Scalars['String']>
  stateInscription?: Maybe<Scalars['String']>
  corporatePhone?: Maybe<Scalars['String']>
  isCorporate: Scalars['Boolean']
  profileCompleteOnLoading?: Maybe<Scalars['String']>
  profileErrorOnLoading?: Maybe<Scalars['String']>
  customerClass?: Maybe<Scalars['String']>
}

export type UserProfileInput = {
  email?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  document?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  documentType?: Maybe<Scalars['String']>
  isCorporate?: Maybe<Scalars['Boolean']>
  corporateName?: Maybe<Scalars['String']>
  tradeName?: Maybe<Scalars['String']>
  corporateDocument?: Maybe<Scalars['String']>
  stateInscription?: Maybe<Scalars['String']>
}

export type UserType = 'CALL_CENTER_OPERATOR' | 'STORE_USER'

export type Validator = {
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

export {}
