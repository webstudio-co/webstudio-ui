import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../../api/shopify/apollo'
import ShopContext from './ShopContext'
import { Checkout, Customer, Cart } from 'webstudio/types/shopify'
import { createShopifyClient } from '../../api/shopify/ShopifyClient'
import { getCookie } from 'cookies-next'

type ShopProviderProps = {
	domain: string
	storefrontAccessToken: string
	children: React.ReactNode
	logo?: string
	shopUrl: string
	authCookie: string
	apiVersion?: string
}

const ShopProvider = (props: ShopProviderProps) => {
	const {
		children,
		logo,
		domain,
		authCookie,
		shopUrl,
		storefrontAccessToken,
		apiVersion = '2023-10',
	} = props

	const fetchAccessToken = () => String(getCookie(authCookie))

	const apolloClient = useApollo(domain, storefrontAccessToken, apiVersion)
	const shopifyClient = createShopifyClient(
		domain,
		storefrontAccessToken,
		fetchAccessToken,
		apiVersion
	)

	const [accessToken, setAccessToken] = useState()
	const [alert, setAlert] = useState()

	const [cart, setCart] = useState<Cart>(null)
	const [checkout, setCheckout] = useState<Checkout>(null)
	const [customer, setCustomer] = useState<Customer | any>({})

	const [expiresAt, setExpiresAt] = useState()
	const [loading, setLoading] = useState(false)
	const [lineItemTotal, setLineItemTotal] = useState(0)
	const [shop, setShop] = useState()

	const [authOpen, setAuthOpen] = useState(false)
	const [cartOpen, setCartOpen] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)

	const toggleAuth = () => setAuthOpen(!authOpen)
	const toggleCart = () => setCartOpen(!cartOpen)
	const toggleMenu = () => setMenuOpen(!menuOpen)
	const toggleSearch = () => setSearchOpen(!searchOpen)

	const value = {
		shopifyClient,

		accessToken,
		setAccessToken,

		alert,
		setAlert,

		expiresAt,
		setExpiresAt,

		cart,
		setCart,

		customer,
		setCustomer,

		shopUrl,

		logo,

		loading,
		setLoading,

		shop,
		setShop,

		authOpen,
		setAuthOpen,
		toggleAuth,

		cartOpen,
		setCartOpen,
		toggleCart,

		searchOpen,
		setSearchOpen,
		toggleSearch,

		menuOpen,
		setMenuOpen,
		toggleMenu,

		checkout,
		setCheckout,
		lineItemTotal,
		setLineItemTotal,
	}

	return (
		<ShopContext.Provider value={value}>
			<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
		</ShopContext.Provider>
	)
}

export default ShopProvider
