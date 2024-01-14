import { Home, Heart, ShoppingBag, Instagram, Search } from 'lucide-react'

export const SHOP_MENU_ITEMS = [
	{
		id: 'home',
		value: '/',
		label: 'Home',
		icon: Home,
	},
	{
		id: 'search',
		value: 'search',
		label: 'Search',
		icon: Search,
	},
	{
		id: 'products',
		value: '/search',
		label: 'Products',
		icon: ShoppingBag,
	},
	{
		id: 'favorites',
		value: '/favorites',
		label: 'Favorites',
		icon: Heart,
	},
	{
		id: 'posts',
		value: '/posts',
		label: 'Posts',
		icon: Instagram,
	},
]


// See all sort keys:
// https://shopify.dev/docs/api/storefront/2023-04/enums/ProductSortKeys
export const PRODUCT_SORT_OPTIONS = [
	{ label: 'Title A-Z', value: 'TITLE', reverse: false },
	{ label: 'Title Z-A', value: 'TITLE', reverse: true },
	{ label: 'Recommended', value: 'RELEVANCE', reverse: false },
	{ label: 'Price - High to Low', value: 'PRICE', reverse: true },
	{ label: 'Price - Low to High', value: 'PRICE', reverse: false },
	{ label: 'Popular', value: 'BEST_SELLING', reverse: false },
]

export const COLLECTION_SORT_OPTIONS = [
	{ label: 'Collection', value: 'COLLECTION_DEFAULT', reverse: false },
	{ label: 'Title A-Z', value: 'TITLE', reverse: false },
	{ label: 'Title Z-A', value: 'TITLE', reverse: true },
	{ label: 'Price - High to Low', value: 'PRICE', reverse: true },
	{ label: 'Price - Low to High', value: 'PRICE', reverse: false },
]
