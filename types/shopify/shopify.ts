// Types.ts
export type MoneyV2 = {
	amount: string
	currencyCode: string
}

export type ShopifyImage = {
	id: string
	altText: string
	src: string
}

export type ProductOption = {
	id: string
	name: string
	values: string[]
}

export type PriceRange = {
	minVariantPrice: MoneyV2
	maxVariantPrice: MoneyV2
}

export type SelectedOption = {
	name: string
	value: string
}

export type Variant = {
	availableForSale: boolean
	compareAtPrice?: MoneyV2
	id: string
	image?: ShopifyImage
	price: MoneyV2
	requiresShipping: boolean
	selectedOptions: SelectedOption[]
	sku: string
	title: string
	weight?: number
	weightUnit: string
}

export type SellingPlanPriceAdjustment = {
	adjustmentValue: {
		adjustmentAmount?: MoneyV2
		adjustmentPercentage?: number
		price?: MoneyV2
	}
}

export type SellingPlan = {
	id: string
	name: string
	description: string
	priceAdjustments: SellingPlanPriceAdjustment[]
}

export type SellingPlanGroup = {
	name: string
	sellingPlans: SellingPlan[]
}

export type MetafieldReferenceVariant = {
	id: string
	title: string
	sku: string
	availableForSale: boolean
}

export type MetafieldReferenceShopifyImage = {
	image: ShopifyImage
}

export type MetafieldReference = {
	id: string
	handle: string
	type: string
	updatedAt: string
	fields: {
		key: string
		type: string
		value: string
		reference?: {
			id: string
			handle: string
			title: string
			variants?: Variant[]
		}
	}[]
}

export type Metafield = {
	id: string
	key: string
	value: string
	namespace: string
	description: string
	reference?: MetafieldReferenceVariant | MetafieldReferenceShopifyImage
	references: MetafieldReference[]
}

export type Product = {
	availableForSale: boolean
	createdAt: string
	updatedAt: string
	description: string
	descriptionHtml: string
	handle: string
	id: string
	images: {
		edges: {
			node: ShopifyImage[]
		}[]
	}
	metafields: Metafield[]
	onlineStoreUrl: string
	options: ProductOption[]
	priceRange: PriceRange
	sellingPlanGroups: SellingPlanGroup[]
	productType: string
	publishedAt: string
	tags: string[]
	title: string
	variants: Variant[]
	vendor: string
	seo: SEO
}

export type ProductVariant = {
	id: string
	title: string
	price: MoneyV2
	image?: ShopifyImage
	compareAtPrice?: MoneyV2
	availableForSale: boolean
	sku?: string
	selectedOptions: SelectedOption[]
	requiresShipping: boolean
	taxable: boolean
	weight?: number
	weightUnit?: string
  product: Product
	presentmentPrices?: MoneyV2[]
}

export type SEO = {
	title?: string
	description?: string
}

export type Collection = {
	id: string
	title: string
	description: string
	descriptionHtml: string
	updatedAt: string
	handle: string
	image?: ShopifyImage
	seo: SEO
	products: Product[]
}

export type CartLine = {
	id?: string
	merchandiseId: string
	quantity: number
	sellingPlanId?: string
	attributes?: Record<string, any>
  discountAllocations?: {
    allocatedAmount: MoneyV2
    discountApplication: {
      targetSelection: string
      targetType: string
      value: {
        percentage: number
      }
    }
  }[]
  sellingPlanAllocation?: {
    priceAdjustments: {
      price: MoneyV2
      perDeliveryPrice: MoneyV2
      compareAtPrice: MoneyV2
      unitPrice: MoneyV2
    }[]
    sellingPlan: SellingPlan
  }
	merchandise?: ProductVariant
}

export type Cart = {
	id: string
  attribute: {
    key: string
    value: string
  }
  attributes: {
    key: string
    value: string
  }[]
	lineItems: CartLine[]
	lineItemsSubtotalPrice: MoneyV2
	checkoutUrl: string
  discountCodes: {
    code: string
    applicable: boolean
  }[]
  discountAllocations: {
    discountedAmount: MoneyV2
  }[]
  cost: {
    checkoutChargeAmount: MoneyV2
    totalTaxAmount: MoneyV2
    totalTaxAmountEstimated: MoneyV2
    totalAmount: MoneyV2
    totalAmountEstimated: MoneyV2
    totalDutyAmount: MoneyV2
    totalDutyAmountEstimated: MoneyV2
    subtotalAmount: MoneyV2
    subtotalAmountEstimated: MoneyV2
  }
	webUrl: string
}

export type CheckoutLineItem = {
	title: string
	variantId: string
	quantity: number
	variant: {
		title: string
		price: MoneyV2
		product: {
			title: string
		}
	}
}

export type ShippingRate = {
	handle: string
	title: string
	price: MoneyV2
}

export type Checkout = {
	id: string
	webUrl: string
	totalPriceV2: MoneyV2
	subtotalPriceV2: MoneyV2
	totalTaxV2: MoneyV2
	completedAt: string | null
	createdAt: string
	updatedAt: string
	email: string | null
	note: string | null
	shippingAddress: Address | null
	shippingLine: ShippingRate | null
	lineItems: CheckoutLineItem[]
}

export type Address = {
	firstName: string
	lastName: string
	address1: string
	address2: string
	city: string
	province: string
	country: string
	zip: string
}

export type DefaultAddress = Address & {
	name: string
}

export type Customer = {
	id: string
	displayName: string
	email: string
	firstName: string
	lastName: string
	phone?: string
	createdAt: string
	updatedAt: string
	acceptsMarketing: boolean
	addresses: Address[]
	defaultAddress?: DefaultAddress
	lastIncompleteCheckout?: {
		id: string
		createdAt: string
		updatedAt: string
		webUrl: string
	}
	password?: string
	passwordConfirmation?: string
}

export type MailingAddress = {
	address1: string
	address2?: string
	city: string
	company?: string
	country: string
	firstName: string
	lastName: string
	phone: string
	province: string
	zip: string
}

export type OrderLineItem = {
	title: string
	variantTitle?: string
	quantity: number
	price?: MoneyV2
	variant?: Variant
}

export type ShippingAddress = {
	firstName: string
	lastName: string
	address1: string
	address2?: string
	city: string
	province?: string
	country: string
	zip: string
	phone?: string
	company?: string
}

export type Order = {
	id: string
	name: string
	statusUrl: string
	orderNumber: number
	processedAt: string
	currencyCode: string
	totalPrice: MoneyV2
	totalRefunded: MoneyV2
	totalShippingPrice: MoneyV2
	lineItems: OrderLineItem[]
	shippingAddress?: ShippingAddress
}

export type ProductCollectionFilter =
	| { available: boolean }
	| { productType: string }
	| { productVendor: string }
	| {
			variantOption: {
				name: string
				value: string
			}
	  }
	| {
			productMetafield:
				| {
						namespace: string
						key: string
						value: string
				  }
				| {
						price: {
							min: number
							max?: number
						}
				  }
	  }
	| { tag: string }

export type ProductCollectionFilters = ProductCollectionFilter[]
