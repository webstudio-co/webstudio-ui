import React, { useState, useEffect } from 'react'
import ProductContext from './ProductContext'
import {
	ProductVariant,
	ShopifyProduct,
	ShopifyCollection,
} from '../../api/shopify/types'

type ProductProviderProps = {
	children: React.ReactNode
}

const ProductProvider = (props: ProductProviderProps) => {
	const { children } = props
	const [product, setProduct] = useState<ShopifyProduct>(null)
	const [variant, setVariant] = useState<ProductVariant>(null)
	const [collection, setCollection] = useState<ShopifyCollection>(null)
	const [selectedOptions, setSelectedOptions] = useState<Record<any, string>>(
		{}
	)
	const [availableForSale, setAvailableForSale] = useState(true)

	useEffect(() => {
		if (product) {
			setAvailableForSale(product.availableForSale)
		}
	}, [product])

	const value = {
		availableForSale,
		setAvailableForSale,
		product,
		setProduct,
		variant,
		setVariant,
		collection,
		setCollection,
		selectedOptions,
		setSelectedOptions,
	}

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	)
}

export default ProductProvider
