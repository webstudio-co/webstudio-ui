import React, { useContext, useEffect, useState } from 'react'
import { AuthScreen, LayoutLoader } from 'webstudio/components'
import { useOrders } from 'webstudio/hooks/shopify'
import { OrderList } from 'webstudio/components/shopify'
import { AppContext } from 'webstudio/context'
import { useRouter } from 'next/router'
import { getShopifyIdFromGid } from 'webstudio/api/shopify/utils'

type ShopifyCustomerOrdersProps = {
	logo: string
	title?: string
	subtitle?: string
}

const ShopifyCustomerOrders: React.FC<ShopifyCustomerOrdersProps> = (props) => {
	const router = useRouter()

	const { clientUrl } = useContext(AppContext)

	const {
		logo,
		title = 'Customer Orders',
		subtitle = 'Manage your orders',
	} = props || {}

	const { loading, orders, fetchCustomerOrders } = useOrders()

	const handleClick = (order) => {
		let orderId = getShopifyIdFromGid(order?.id)
		router.push(`${clientUrl}/shopify/orders/${orderId}`)
	}

	useEffect(() => {
		if (!orders) {
			fetchCustomerOrders({
				first: 20,
			})
		}
	}, [orders])

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				<OrderList orders={orders} handleClick={handleClick} />
			</AuthScreen>
		</LayoutLoader>
	)
}

export default ShopifyCustomerOrders
