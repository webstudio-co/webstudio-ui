import { gql } from '@apollo/client'

export const ProductFragment = gql`
	fragment ProductFragment on Product {
		availableForSale
		createdAt
		updatedAt
		description
		descriptionHtml
		handle
		id
		images(first: 250) {
			edges {
				node {
					id
					altText
					url
				}
			}
		}
		metafields(identifiers: [
      { key: "StarRatingSnippet", namespace: "okendo" }
      { key: "ReviewsWidgetSnippet", namespace: "okendo" }
    ]) {
			id
			key
			value
			namespace
			description
			reference {
				... on ProductVariant {
					id
					title
					sku
					availableForSale
				}
				... on MediaImage {
					image {
						id
						altText
						url
					}
				}
			}
			references(first: 250) {
				edges {
					node {
						... on Metaobject {
							id
							handle
							type
							updatedAt
							fields {
								key
								type
								value
								reference {
									... on Product {
										id
										handle
										title
										variants(first: 20) {
											edges {
												node {
													id
													sku
													title
													price {
														amount
														currencyCode
													}
													image {
														url
													}
													availableForSale
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		onlineStoreUrl
		options {
			id
			name
			values
		}
		priceRange {
			minVariantPrice {
				amount
				currencyCode
			}
			maxVariantPrice {
				amount
				currencyCode
			}
		}
		sellingPlanGroups(first: 10) {
			edges {
				node {
					name
					sellingPlans(first: 10) {
						edges {
							node {
								id
								name
								description
								priceAdjustments {
									adjustmentValue {
										... on SellingPlanFixedAmountPriceAdjustment {
											adjustmentAmount {
												amount
												currencyCode
											}
										}
										... on SellingPlanFixedPriceAdjustment {
											price {
												amount
												currencyCode
											}
										}
										... on SellingPlanPercentagePriceAdjustment {
											adjustmentPercentage
										}
									}
								}
							}
						}
					}
				}
			}
		}
		productType
		publishedAt
		tags
		title
		updatedAt
		variants(first: 250) {
			edges {
				node {
					availableForSale
					compareAtPrice {
						amount
						currencyCode
					}
					id
					image {
						id
						altText
						url
					}
					price {
						amount
						currencyCode
					}
					requiresShipping
					selectedOptions {
						name
						value
					}
					sku
					title
					weight
					weightUnit
				}
			}
		}
		vendor
	}
`

export const QUERY_PRODUCT_BY_HANDLE = gql`
	query Product($handle: String!) {
		productByHandle(handle: $handle) {
			...ProductFragment
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCT_BY_ID = gql`
	query Product($id: ID!) {
		product(id: $id) {
			...ProductFragment
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCTS = gql`
	query Products(
		$query: String
		$reverse: Boolean
		$sortKey: ProductSortKeys
		$after: String
	) {
		products(
			first: 48
			after: $after
			query: $query
			reverse: $reverse
			sortKey: $sortKey
		) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					...ProductFragment
				}
			}
		}
	}
	${ProductFragment}
`

export const QUERY_PRODUCT_RECOMMENDATIONS = gql`
	query ProductRecommendations($productId: ID!) {
		productRecommendations(productId: $productId) {
			...ProductFragment
		}
	}
	${ProductFragment}
`
