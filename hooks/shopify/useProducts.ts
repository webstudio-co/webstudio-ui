import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from 'webstudio/context'
import { ShopifyProduct, ProductImage } from 'types'
import useLoadingWrapper from '../common/useLoadingWrapper'

const useProducts = () => {
	const { shopifyClient } = useContext(ShopContext)

	const { loading, errors, loadingWrapper } = useLoadingWrapper()

	const [cursor, setCursor] = useState()
	const [hasNextPage, setHasNextPage] = useState(false)
	const [images, setImages] = useState<ProductImage[]>()
	const [product, setProduct] = useState<ShopifyProduct>()
	const [products, setProducts] = useState<ShopifyProduct[]>()

	const fetchProduct = async (handle) => {
		setProduct(null)
		const resp = await loadingWrapper(() => shopifyClient.findProduct(handle))
		setProduct(resp?.data)
	}

	const fetchProductById = async (id) => {
		setProduct(null)
		const resp = await loadingWrapper(() => shopifyClient.findProductById(id))
		setProduct(resp?.data)
	}

	const fetchProducts = async (productsQuery) => {
		const {
			first,
			reverse,
			sortKey = 'RELEVANCE',
			query,
			after,
		} = productsQuery

		const resp = await loadingWrapper(() =>
			shopifyClient.findProducts({
				first,
				query,
				sortKey,
				reverse,
				after,
			})
		)
		setHasNextPage(resp?.meta?.hasNextPage)
		setCursor(resp?.meta?.endCursor)
		const results = resp?.data
		if (after) {
			setProducts([...products, ...results])
		} else {
			setProducts(results)
		}
		return resp?.data
	}

	const searchProducts = async (searchParams) => {
		const { query, first, after } = searchParams

		const resp = await loadingWrapper(() =>
			shopifyClient.searchProducts({
				first,
				query,
				sortKey: 'RELEVANCE',
				reverse: false,
				after,
			})
		)
		setHasNextPage(resp?.meta?.hasNextPage)
		setCursor(resp?.meta?.endCursor)
		const results = resp?.data
		if (after) {
			setProducts([...products, ...results])
		} else {
			setProducts(results)
		}
		return resp?.data
	}

	const fetchProductRecommendations = async (productId) => {
		const resp = await loadingWrapper(() =>
			shopifyClient.findProductRecommendations(productId)
		)
		setProducts(resp?.data)
	}

	useEffect(() => {
		if (product) {
			//@ts-ignore
			setImages(product?.images?.edges.map((e) => e.node))
		}
	}, [product])

	return {
		images,
		product,
		products,
		setProduct,
		setProducts,
		fetchProduct,
		fetchProducts,
		fetchProductById,
		fetchProductRecommendations,
		searchProducts,
		hasNextPage,
		cursor,
		setCursor,
		loading,
		errors,
	}
}

export default useProducts
