import React, { useState } from 'react'
import CollectionContext from './CollectionContext'
import { Product, Collection } from '@webstudio/shopify'

type CollectionProviderProps = {
	children: React.ReactNode
}

const CollectionProvider = (props: CollectionProviderProps) => {
	const { children } = props
	const [collection, setCollection] = useState<Collection>(null)
	const [products, setProducts] = useState<Product[]>(null)
	const [query, setQuery] = useState<Record<any, string>>({})

	const value = {
		query,
		setQuery,
		collection,
		setCollection,
		products,
		setProducts,
	}

	return (
		<CollectionContext.Provider value={value}>
			{children}
		</CollectionContext.Provider>
	)
}

export default CollectionProvider
