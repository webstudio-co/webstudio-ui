import React, { useEffect, useContext } from 'react'
import { ProductContext } from '@webstudio/shopify/context'
import { useProducts } from '@webstudio/shopify/hooks'
import { Product } from '@webstudio/shopify/types'

type ShopifyProductPageProps = {
	handle?: string | string[]
	product?: Product
	children: any
}

const ShopifyProduct: React.FC<ShopifyProductPageProps> = (props) => {
	const { handle, product: initialProduct, children } = props

	const { product, fetchProduct } = useProducts()

	const { setProduct } = useContext(ProductContext)

	useEffect(() => {
		if (handle) {
			fetchProduct(handle)
		}
	}, [handle])

	useEffect(() => {
		if (initialProduct) {
			setProduct(initialProduct)
		}
	}, [initialProduct])

	useEffect(() => {
		if (product) {
			setProduct(product)
		}
	}, [product])

	return children
}

export default ShopifyProduct
