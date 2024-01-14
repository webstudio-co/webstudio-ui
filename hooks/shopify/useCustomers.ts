import React, { useState, useContext } from 'react'
import { Customer } from 'webstudio/api/shopify/types'
import useLoadingWrapper from '../common/useLoadingWrapper'
import { ShopContext } from 'webstudio/context'

const useCustomers = () => {
	const { shopifyClient } = useContext(ShopContext)
	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const [customer, setCustomer] = useState<Customer>(null)

	const fetchCustomer = async (customerAccessToken) => {
		const resp = await loadingWrapper(() =>
			shopifyClient.findCustomer(customerAccessToken)
		)
		setCustomer(resp?.data)
		return resp?.data
	}

	const createCustomer = async ({
		firstName,
		lastName,
		email,
		password,
		acceptsMarketing = false,
	}) => {
		let resp = await loadingWrapper(() =>
			shopifyClient.createCustomer({
				firstName,
				lastName,
				email,
				password,
				acceptsMarketing,
			})
		)
		setCustomer(resp?.data)
		return resp?.data
	}

	const updateCustomer = async (customerAccessToken, customer) => {
		let resp = await loadingWrapper(() =>
			shopifyClient.updateCustomer(customerAccessToken, customer)
		)
		setCustomer(resp?.data)
		return resp?.data
	}

	return {
		loading,
		errors,
		customer,
		fetchCustomer,
		createCustomer,
		updateCustomer,
	}
}

export default useCustomers
