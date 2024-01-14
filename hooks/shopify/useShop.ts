import React, { useContext } from 'react'
import { ShopContext } from 'webstudio/context'
import { useLoadingWrapper } from 'webstudio/hooks'

const useShop = () => {
	const { shopifyClient, shop, setShop } = useContext(ShopContext)

	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const findShop = async () => {
		let response = await loadingWrapper(() => shopifyClient.findShop())
		setShop(response?.data)
		return response?.data
	}

	return {
		loading,
		errors,
		shop,
		findShop,
	}
}

export default useShop
