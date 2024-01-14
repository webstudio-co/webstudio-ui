import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from 'webstudio/context'
import { setCookie, getCookie } from 'cookies-next'
import { useLoadingWrapper } from 'webstudio/hooks'

const useCheckout = () => {
	
  const { shopifyClient, checkout, setCheckout, setLineItemTotal } =
		useContext(ShopContext)

	const { loading, errors, loadingWrapper } = useLoadingWrapper()

	const [discountCodes, setDiscountCodes] = useState<Record<string, any>[]>([])
	const [discountCodeError, setDiscountCodeError] = useState<
		Record<string, string>
	>({})

	const checkoutLineItemAdd = async (lineItem) => {
		const { variantId, quantity, customAttributes } = lineItem || {}
		const response = await loadingWrapper(() =>
			shopifyClient.addCheckoutLineItem(checkout?.id, {
				variantId,
				quantity,
				customAttributes,
			})
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutLineItemsAdd = async (lineItems) => {
		const response = await loadingWrapper(() =>
			shopifyClient.addCheckoutLineItems(checkout?.id, lineItems)
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutLineItemUpdate = async (lineItemId, quantity) => {
		let lineItems = [{ id: lineItemId, quantity }]
		return await checkoutLineItemsUpdate(lineItems)
	}

	const checkoutLineItemsUpdate = async (lineItems) => {
		const response = await loadingWrapper(() =>
			shopifyClient.updateCheckoutLineItems(checkout?.id, lineItems)
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutLineItemRemove = async (lineItemId) => {
		const response = await loadingWrapper(() =>
			shopifyClient.removeCheckoutLineItems(checkout?.id, [lineItemId])
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutLineItemsRemove = async (lineItemIds) => {
		const response = await loadingWrapper(() =>
			shopifyClient.removeCheckoutLineItems(checkout?.id, lineItemIds)
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutDiscountCodeApply = async (discountCode) => {
		const response = await loadingWrapper(() =>
			shopifyClient.applyCheckoutDiscountCode(checkout?.id, discountCode)
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutDiscountCodeRemove = async () => {
		const response = await loadingWrapper(() =>
			shopifyClient.removeCheckoutDiscountCode(checkout?.id)
		)
		setCheckout(response?.data)
		return response?.data
	}

	const checkoutFindOrCreate = async () => {
		let resp
		let checkoutId = getCookie('shopifyCheckoutId')
		if (checkoutId) {
			resp = await loadingWrapper(() => shopifyClient.findCheckout(checkoutId))
			if (resp?.data?.orderStatusUrl != null) {
				// If there was a successful checkout,
				// clear the cookie and create a new checkout
				setCheckout(null)
				setCookie('shopifyCheckoutId', null)
				resp = await loadingWrapper(() => shopifyClient.checkoutCreate())
				setCheckout(resp?.data)
				return resp?.data
			} else {
				setCheckout(resp?.data)
				return resp?.data
			}
		} else {
			const variables = { input: {} }
			resp = await loadingWrapper(() => shopifyClient.checkoutCreate(variables))
			setCheckout(resp?.data)
			return resp?.data
		}
	}

	useEffect(() => {
		if (checkout) {			
			setCookie('shopifyCheckoutId', checkout?.id)
			if (checkout?.discountApplications?.edges) {
				let codes = checkout?.discountApplications?.edges.map(
					({ node: discount }) => ({
						code: discount.code,
						amount: discount.value?.amount,
						percentage: discount.value?.percentage,
					})
				)
				setDiscountCodes(codes)
			}
		} else {
			checkoutFindOrCreate()
		}
	}, [checkout])

	useEffect(() => {
		checkoutFindOrCreate()
	}, [])

	return {
		loading,
		errors,
		checkout,
		discountCodes,
		discountCodeError,
		setDiscountCodeError,
		checkoutLineItemAdd,
		checkoutLineItemsAdd,
		checkoutLineItemUpdate,
		checkoutLineItemsUpdate,
		checkoutLineItemRemove,
		checkoutLineItemsRemove,
		checkoutDiscountCodeApply,
		checkoutDiscountCodeRemove,
	}
}

export default useCheckout
