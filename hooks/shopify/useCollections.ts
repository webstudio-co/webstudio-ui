import React, { useContext, useState } from 'react'
import { ShopContext } from 'webstudio/context'
import { useLoadingWrapper } from 'webstudio/hooks'
import {
	Image,
	Collection,
	Product,
	ProductCollectionFilter,
} from 'webstudio/types/shopify'

const PER_PAGE = 20

// Product filtering:
// https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/products-collections/filter-products
const useCollections = () => {
	const { shopifyClient } = useContext(ShopContext)

	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const [image, setImage] = useState<Image>(null)
	const [cursor, setCursor] = useState<string>(null)
	const [hasNextPage, setHasNextPage] = useState(false)
	const [products, setProducts] = useState<Product[]>(null)
	const [collection, setCollection] = useState<Collection>(null)
	const [collections, setCollections] = useState<Collection[]>(null)
	const [filters, setFilters] = useState<any | ProductCollectionFilter[]>([])

	const filterInStock = () => {
		if (filters.find((f) => f.available)) {
			removeFilter(filters.find((f) => f.available))
		} else {
			addFilter({ available: true })
		}
	}

	const filterProductType = (productType: string) => {
		if (filters.find((f) => f.productType === productType)) {
			removeFilter(filters.find((f) => f.productType === productType))
		} else {
			addFilter({ productType })
		}
	}

	const filterVendor = (productVendor: string) => {
		if (filters.find((f) => f.productVendor === productVendor)) {
			removeFilter(filters.find((f) => f.productVendor === productVendor))
		} else {
			addFilter({ productVendor })
		}
	}

	const filterVariantOption = (name: string, value: string | number) => {
		if (
			filters.find(
				(f) =>
					f.variantOption?.name === name && f.variantOption?.value === value
			)
		) {
			removeFilter(filters.find((f) => f.variantOption?.name === name))
		} else {
			addFilter({
				variantOption: {
					name: name,
					value: value,
				},
			})
		}
	}

	const filterTag = (tag: string) => {
		if (filters.find((f) => f.tag === tag)) {
			removeFilter(filters.find((f) => f.tag === tag))
		} else {
			addFilter({ tag })
		}
	}

	const filterPrice = (min: number, max: number) => {
		if (filters.find((f) => f.price)) {
			removeFilter(filters.find((f) => f.price))
		}
		addFilter({
			//@ts-ignore
			price: {
				min,
				max,
			},
		})
	}

	const addFilter = (filter: ProductCollectionFilter) => {
		setFilters([...filters, filter])
	}

	const removeFilter = (filter: ProductCollectionFilter) => {
		setFilters(filters.filter((f) => f !== filter))
	}

	const clearFilters = () => {
		setFilters([])
	}

	const fetchCollection = async (handle, query?: any) => {
		const {
			first = PER_PAGE,
			filters,
			reverse = false,
			sortKey = 'COLLECTION_DEFAULT',
			after,
		} = query || {}

		const resp = await loadingWrapper(() =>
			shopifyClient.findCollection(handle, {
				first,
				filters,
				reverse,
				sortKey,
				after,
			})
		)
		setCollection(resp?.data)
		setHasNextPage(resp?.meta?.hasNextPage)
		setCursor(resp?.meta?.endCursor)
		let collectionProducts = resp?.data?.products
		if (after) {
			setProducts([...products, ...collectionProducts])
		} else {
			setProducts(collectionProducts)
		}
		setImage(resp?.data?.image?.url)
	}

	const fetchCollections = async (perPage = PER_PAGE) => {
		const resp = await loadingWrapper(() =>
			shopifyClient.findCollections(perPage)
		)
		setCollections(resp?.data)
		setCursor(resp?.meta.endCursor)
		setHasNextPage(resp?.meta?.hasNextPage)
	}

	return {
		cursor,
		hasNextPage,
		setHasNextPage,
		collection,
		collections,
		fetchCollection,
		fetchCollections,
		filters,
		setFilters,
		addFilter,
		removeFilter,
		clearFilters,
		filterInStock,
		filterProductType,
		filterVendor,
		filterVariantOption,
		filterTag,
		filterPrice,
		image,
		products,
		loading,
		errors,
	}
}

export default useCollections
