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
