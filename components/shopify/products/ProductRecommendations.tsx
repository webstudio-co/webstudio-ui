import React, { useState, useEffect } from 'react'
import { useProducts } from '@webstudio/shopify'
import { Typography } from '@mui/material'
import {
	ProductGrid,
	ProductList,
	ProductCarousel,
} from 'webstudio/components/shopify'
import { Box } from '@mui/material'

type ProductRecommendationsProps = {
	handle?: string | string[]
	editing?: boolean
	layout?: 'list' | 'grid' | 'carousel'
	title?: string
	perPage?: string
	productComponent?: React.FC<any>
	enableBorder?: boolean
	enableAddToCart?: boolean
	enableQuantity?: boolean
	enableQuickShop?: boolean
  enableOkendoStarRating?: boolean
  buttonText?: string
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = (
	props
) => {
	const {
		handle,
		editing = false,
		layout = 'grid',
		title = 'Similar products',
		perPage = 12,
		productComponent,
		enableBorder = false,
    buttonText = 'Add to cart',
		enableAddToCart,
		enableQuantity,
		enableQuickShop,
    enableOkendoStarRating
	} = props || {}

	const [similarProducts, setSimilarProducts] = useState<any>()

	const {
		loading,
		fetchProduct,
		product,
		products,
		fetchProductRecommendations,
	} = useProducts()

	useEffect(() => {
		if (product) {
			fetchProductRecommendations(product?.id)
		}
	}, [product])

	// Hide the current product and any products marked hidden
	useEffect(() => {
		if (product && products) {
			setSimilarProducts(
				products
					.filter((p) => p.id != product?.id)
					.filter((p) => !p.tags.includes('hidden'))
					.filter((p, index) => index < Number(perPage))
			)
		}
	}, [product, products])

	useEffect(() => {
		if (handle) {
			fetchProduct(handle)
		}
	}, [handle])

	return (
		<Box sx={sx.root}>
			{title && (
				<Typography mb={2} color="textPrimary" variant="h6">
					{title}
				</Typography>
			)}
			{layout == 'list' && (
				<ProductList
					editing={editing}
					loading={loading}
					products={similarProducts}
					productComponent={productComponent}
					enableBorder={enableBorder}
					enableAddToCart={enableAddToCart}
					enableQuantity={enableQuantity}
					enableQuickShop={enableQuickShop}
          enableOkendoStarRating={enableOkendoStarRating}
          buttonText={buttonText}
				/>
			)}
			{layout == 'grid' && (
				<ProductGrid
					editing={editing}
					loading={loading}
					products={similarProducts}
					productComponent={productComponent}
					enableBorder={enableBorder}
					enableAddToCart={enableAddToCart}
					enableQuantity={enableQuantity}
					enableQuickShop={enableQuickShop}
          enableOkendoStarRating={enableOkendoStarRating}
          buttonText={buttonText}
				/>
			)}
			{layout == 'carousel' && (
				<ProductCarousel
					editing={editing}
					loading={loading}
					products={similarProducts}
					productComponent={productComponent}
					enableBorder={enableBorder}
          enableOkendoStarRating={enableOkendoStarRating}
          buttonText={buttonText}
				/>
			)}
		</Box>
	)
}

export default ProductRecommendations

const sx = {
	root: {
		width: '100%',
	},
}
