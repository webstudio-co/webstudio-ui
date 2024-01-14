import React, { useContext } from 'react'
import { ShopContext } from 'webstudio/context/shopify'
import { useLoadingWrapper } from 'webstudio/hooks'
import { deleteCookie, setCookie } from 'cookies-next'

const useAuth = () => {
	const {
		authCookie,
		shopifyClient,
		customer,
		setCustomer,
		accessToken,
		setAccessToken,
		expiresAt,
		setExpiresAt,
	} = useContext(ShopContext)

	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const login = async ({ email, password }) => {
		const resp = await loadingWrapper(() =>
			shopifyClient.login(email, password)
		)
		handleCustomerAccessToken(resp?.data)
		setCustomer(resp?.data)
		return resp?.data
	}

	const signup = async ({
		firstName,
		lastName,
		email,
		password,
		acceptsMarketing = false,
	}) => {
		const resp = await loadingWrapper(() =>
			shopifyClient.signup({
				firstName,
				lastName,
				email,
				password,
				acceptsMarketing,
			})
		)
		if (resp?.data?.email) {
			await login({ email, password })
		}
		return resp?.data
	}

	const logout = async () => {
		const resp = await loadingWrapper(() => shopifyClient.logout())
		setCustomer(null)
		setAccessToken()
		setExpiresAt()
		deleteCookie(authCookie)
		deleteCookie(`${authCookie}-expires-at`)
		return resp?.data
	}

	const refreshCustomerAccessToken = async (token) => {
		let resp = await loadingWrapper(() =>
			shopifyClient.refreshCustomerAccessToken(token)
		)
		handleCustomerAccessToken(resp?.data)
		return resp?.data
	}

	const forgotPassword = async (email) => {
		return await loadingWrapper(() => shopifyClient.forgotPassword(email))
	}

	const resetPassword = async (password, resetUrl) => {
		let resp = await loadingWrapper(() =>
			shopifyClient.resetPassword(password, resetUrl)
		)
		return resp?.data
	}

	const handleCustomerAccessToken = (customerAccessToken) => {
		const {
			accessToken: shopifyAccessToken,
			expiresAt: shopifyTokenExpiresAt,
		} = customerAccessToken || {}

		if (shopifyAccessToken && shopifyTokenExpiresAt) {
			setAccessToken(shopifyAccessToken)
			setExpiresAt(Date.parse(shopifyTokenExpiresAt))
			setCookie(authCookie, shopifyAccessToken)
			setCookie(`${authCookie}-expires-at`, shopifyTokenExpiresAt)
		}
	}

	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
		setCustomer({
			...customer,
			[name]: value,
		})
	}

	return {
		loading,
		errors,
		accessToken,
		setAccessToken,
		customer,
		setCustomer,
		handleChange,

		login,
		signup,
		logout,
		forgotPassword,
		resetPassword,
		refreshCustomerAccessToken,

		expiresAt,
		setExpiresAt,
	}
}

export default useAuth
