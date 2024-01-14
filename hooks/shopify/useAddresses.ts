import React, { useState, useContext } from 'react'
import { ShopContext } from 'webstudio/context'
import { getShopifyIdFromGid } from 'webstudio/helpers/shopify'
import { useLoadingWrapper } from 'webstudio/hooks'
import { Address } from '@webstudio/shopify'

const useAddresses = () => {
	const { shopifyClient } = useContext(ShopContext)

	const { loading, errors, loadingWrapper } = useLoadingWrapper()

	const [address, setAddress] = useState<any | Address>({})
	const [addresses, setAddresses] = useState<Address[]>(null)

	const fetchCustomerAddress = async (addressId) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findCustomerAddresses(50)
		)
		const _address = response?.data?.find(
			(a) => getShopifyIdFromGid(a.id) == String(addressId)
		)
		if (_address) {
			setAddress(_address)
		}
		return _address
	}

	const fetchCustomerAddresses = async (first = 20, cursor = null) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findCustomerAddresses(first, cursor)
		)
		if (response?.data) {
			setAddresses(response?.data)
		}
		return response?.data
	}

	const updateCustomerAddress = async (address) => {
		const response = await loadingWrapper(() =>
			shopifyClient.updateCustomerAddress(address)
		)
		if (response?.data) {
			setAddress(response?.data)
		}
		return response?.data
	}

	const createCustomerAddress = async (address) => {
		const response = await loadingWrapper(() =>
			shopifyClient.createCustomerAddress(address)
		)
		if (response?.data) {
			setAddress(response?.data)
		}
		return response?.data
	}

	const deleteCustomerAddress = async (id) => {
		const response = await loadingWrapper(() =>
			shopifyClient.deleteCustomerAddress(id)
		)
		return response?.data
	}

	const handleChange = (ev) => {
		const { name, value } = ev.target
		setAddress({
			...address,
			[name]: value,
		})
	}

	return {
		loading,
		errors,
		address,
		addresses,
		updateCustomerAddress,
		createCustomerAddress,
		deleteCustomerAddress,
		fetchCustomerAddress,
		fetchCustomerAddresses,
		handleChange,
	}
}

export default useAddresses
