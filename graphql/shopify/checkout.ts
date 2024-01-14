import { gql } from '@apollo/client'

export const CheckoutFragment = gql`
	fragment CheckoutFragment on Checkout {
		id
		email
		webUrl
		taxesIncluded
		totalDuties {
			amount
			currencyCode
		}
		totalPrice {
			amount
			currencyCode
		}
		totalTax {
			amount
			currencyCode
		}
		lineItemsSubtotalPrice {
			amount
			currencyCode
		}
		note
		ready
		completedAt
		orderStatusUrl
		lineItems(first: 250) {
			edges {
				node {
					id
					title
					customAttributes {
						key
						value
					}
					variant {
						id
						title
						image {
							src
						}
						price {
							amount
							currencyCode
						}
						selectedOptions {
							name
							value
						}
						product {
							id
							title
							handle
							productType
							vendor
							metafields(identifiers: []) {
								key
								value
							}
						}
					}
					quantity
				}
			}
		}
		shippingDiscountAllocations {
			allocatedAmount {
				amount
				currencyCode
			}
			discountApplication {
				... on ManualDiscountApplication {
					title
				}
				... on DiscountCodeApplication {
					code
				}
				... on ScriptDiscountApplication {
					title
					value
					allocationMethod
					targetSelection
					targetType
				}
				... on AutomaticDiscountApplication {
					title
				}
			}
		}
		discountApplications(first: 10) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					targetSelection
					allocationMethod
					targetType
					value {
						... on MoneyV2 {
							amount
							currencyCode
						}
						... on PricingPercentageValue {
							percentage
						}
					}
					... on ManualDiscountApplication {
						title
						description
					}
					... on DiscountCodeApplication {
						code
						applicable
					}
					... on ScriptDiscountApplication {
						title
						value
						allocationMethod
						targetSelection
						targetType
					}
					... on AutomaticDiscountApplication {
						title
					}
				}
			}
		}
	}
`

export const CHECKOUT_FETCH = gql`
	query checkout($id: ID!) {
		node(id: $id) {
			...CheckoutFragment
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_CREATE = gql`
	mutation checkoutCreate($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_LINE_ITEMS_ADD = gql`
	mutation checkoutLineItemsAdd(
		$checkoutId: ID!
		$lineItems: [CheckoutLineItemInput!]!
	) {
		checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_LINE_ITEMS_UPDATE = gql`
	mutation checkoutLineItemsUpdate(
		$checkoutId: ID!
		$lineItems: [CheckoutLineItemUpdateInput!]!
	) {
		checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				message
				field
			}
			checkoutUserErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_LINE_ITEMS_REMOVE = gql`
	mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
		checkoutLineItemsRemove(
			checkoutId: $checkoutId
			lineItemIds: $lineItemIds
		) {
			userErrors {
				message
				field
			}
			checkoutUserErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_CUSTOMER_ASSOCIATE = gql`
	mutation checkoutCustomerAssociate(
		$checkoutId: ID!
		$customerAccessToken: String!
	) {
		checkoutCustomerAssociate(
			checkoutId: $checkoutId
			customerAccessToken: $customerAccessToken
		) {
			userErrors {
				field
				message
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_DISCOUNT_CODE_APPLY = gql`
	mutation checkoutDiscountCodeApply($checkoutId: ID!, $discountCode: String!) {
		checkoutDiscountCodeApplyV2(
			discountCode: $discountCode
			checkoutId: $checkoutId
		) {
			checkout {
				...CheckoutFragment
			}
			checkoutUserErrors {
				code
				field
				message
			}
		}
	}
	${CheckoutFragment}
`

export const CHECKOUT_DISCOUNT_CODE_REMOVE = gql`
	mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
		checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
			checkout {
				...CheckoutFragment
			}
			checkoutUserErrors {
				code
				field
				message
			}
		}
	}
	${CheckoutFragment}
`
