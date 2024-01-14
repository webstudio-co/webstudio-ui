import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from 'webstudio/context'
import { getCookie, setCookie } from 'cookies-next'
import { CartLine } from 'webstudio/api/shopify/types'
import { useLoadingWrapper } from 'webstudio/hooks'

const useCart = () => {
	const { shopifyClient, cart, setCart } = useContext(ShopContext)
	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const cartBuyerIdentityUpdate = async (customerAccessToken, email) => {
		let response = await loadingWrapper(() =>
			shopifyClient.updateCartBuyerIdentity(
				cart?.id,
				customerAccessToken,
				email
			)
		)
		setCart(response?.data)
		return response?.data
	}

	const cartLineAdd = async (line: CartLine) => {
		return await cartLinesAdd([line])
	}

	const cartLinesAdd = async (lines: CartLine[]) => {
		const response = await loadingWrapper(() =>
			shopifyClient.cartLinesAdd(cart?.id, lines)
		)
		setCart(response?.data)
		return response?.data
	}

	const cartLineRemove = async (lineId) => {
		const response = await loadingWrapper(() =>
			shopifyClient.cartLineRemove(cart?.id, lineId)
		)
		setCart(response?.data)
		return response?.data
	}

	const cartLinesRemove = async (lineIds) => {
		const response = await loadingWrapper(() =>
			shopifyClient.removeCartLines(cart?.id, lineIds)
		)
		setCart(response?.data)
		return response?.data
	}

  const cartLineUpdate = async (line) => {
    return await cartLinesUpdate([line])
  }

	const cartLinesUpdate = async (lines) => {
		const response = await loadingWrapper(() =>
			shopifyClient.cartLinesUpdate(cart?.id, lines)
		)
		setCart(response?.data)
		return response?.data
	}

  const cartApplyDiscountCode = async (discountCode) => {
		return await cartDiscountCodesUpdate([discountCode])		
	}

	const cartDiscountCodesUpdate = async (discountCodes) => {
		const response = await loadingWrapper(() =>
			shopifyClient.cartDiscountCodesUpdate(cart?.id, discountCodes)
		)
		setCart(response?.data)
		return response?.data
	}

  const cartRemoveDiscountCode = async (code) => {
    let newCodes = []
    if(cart?.discountCodes?.length > 0){    
      newCodes = cart?.discountCodes?.filter((discountCode) => discountCode.code != code)
    }
    return await cartDiscountCodesUpdate(newCodes)
  }

	const findCart = async (cartId) => {
		const response = await loadingWrapper(() => shopifyClient.findCart(cartId))
    if(response?.data?.cart){
		  setCart(response?.data?.cart)
      setCookie('shopifyCartId', response?.data?.cart?.id)
    }
		return response?.data?.cart
	}

	const cartFindOrCreate = async () => {
    let response
		let cartId = await getCookie('shopifyCartId')
		if (cartId) {
			response = await findCart(cartId)
			if (!response) {
				response = await cartCreate()
			}
		} else {
			response = await cartCreate()
		}
		return response
	}

	const cartCreate = async () => {
		const response = await loadingWrapper(() => shopifyClient.cartCreate())
    if(response?.data){
      setCart(response?.data)
      setCookie('shopifyCartId', response?.data?.id)
    }		
		return response?.data
	}

	useEffect(() => {    
		if(!cart?.id) {		
      cartFindOrCreate()
    }
	}, [cart])

	return {
		loading,
		errors,
		cart,
		setCart,
    cartApplyDiscountCode,
    cartBuyerIdentityUpdate,
    cartRemoveDiscountCode,
    cartCreate,
    cartDiscountCodesUpdate,    
		cartFindOrCreate,    
		cartLineAdd,
		cartLinesAdd,
		cartLineRemove,
		cartLinesRemove,
    cartLineUpdate,
		cartLinesUpdate,
    findCart,    
	}
}

export default useCart
