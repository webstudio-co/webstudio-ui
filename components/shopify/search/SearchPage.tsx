import React, { useState, useContext, useEffect } from 'react'
import { useProducts, useSegment } from 'webstudio/hooks/shopify'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import { SearchInput, Placeholder } from 'webstudio/components'
import { ProductGrid } from 'webstudio/components/shopify'
import LoadMore from 'webstudio/components/shopify/search/LoadMore'
import { PER_PAGE } from 'lib/constants'
import { ShopContext } from 'webstudio/context'

const Search: React.FC = () => {
	const router = useRouter()
	const { trackProductsSearched } = useSegment()

	let { query } = router.query
	if (query == 'all') {
		query = ''
	}

	const [keywords, setKeywords] = useState(String(query).toLowerCase())
	const first = PER_PAGE

	const { shopUrl } = useContext(ShopContext)

	const {
		loading,
		errors,
		cursor,
		hasNextPage,
		products,
		fetchProducts,
		searchProducts,
	} = useProducts()

	const handleChange = (ev) => {
		setKeywords(ev.target.value)
		if (keywords?.length == 0) {
			handleSearch('')
		}
	}

	const handleSearch = (keywords) => {
		if (keywords?.length > 0) {
			trackProductsSearched(keywords)
		}
		router.push(`${shopUrl}/search/${keywords.split(' ').join('-')}`)
	}

	const handleLoadMore = (after) => {
		searchProducts({
			query: `${keywords} tag_not:hidden`,
			first: first,
			after,
		})
	}

	useEffect(() => {
		if (query) {
			let searchKeywords = decodeURI(String(query)).split('-')?.join(' ')
			setKeywords(searchKeywords)
			searchProducts({
				query: searchKeywords,
			})
		} else {
			fetchProducts({
				first: 20,
			})
		}
	}, [query])

	return (
		<Box sx={sx.root}>
			<Box sx={sx.searchInput}>
				<SearchInput
					value={keywords}
					handleChange={handleChange}
					handleSearch={handleSearch}
					placeholder={'Search'}
				/>
			</Box>

			{products?.length > 0 && (
				<ProductGrid loading={loading} products={products} />
			)}

			{!loading && (!products || products?.length == 0) && (
				<Placeholder
					title="No search results"
					description="Try another search term"
				/>
			)}

			<LoadMore
				loading={loading}
				hasNextPage={hasNextPage}
				handleSearch={() => handleLoadMore(cursor)}
			/>
		</Box>
	)
}

export default Search

const sx = {
	root: {
		pt: 2,
	},
	searchInput: {
		mb: 2,
	},
}
