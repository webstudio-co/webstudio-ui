import React, { useEffect, useContext } from 'react'
import { useCart } from '@webstudio/shopify'
import { useSegment } from 'webstudio/hooks/addons'
import { Box, Stack } from '@mui/material'
import { ShopContext } from '@webstudio/shopify'
import { Drawer, Placeholder } from 'webstudio/components'
import {
	CartDiscounts,
	CartLines,
	CartTotals,
	CheckoutButton,
} from 'webstudio/components/shopify'

type CartProps = {
	title?: string
}

const Cart: React.FC<CartProps> = (props) => {
	const { title = 'Your Cart' } = props

	const { trackCartViewed } = useSegment()

	const { cartOpen, toggleCart } = useContext(ShopContext)
  const { cart } = useCart()

	useEffect(() => {
		if (cartOpen && cart) {
			trackCartViewed(cart)
		}
	}, [cartOpen, cart])

	return (
		<Drawer
			anchor="right"
			open={cartOpen}
			handleClose={toggleCart}
			title={title}
		>
			{cart?.lines?.edges?.length > 0 ? (
				<Stack sx={sx.root} spacing={4}>
					<CartLines />
					<CartDiscounts />
					<CartTotals />
					<CheckoutButton />
				</Stack>
			) : (
				<Box sx={sx.empty}>
					<Placeholder
						title="Your cart is empty"
						description="Items you add to your cart will siteear here."
					/>
				</Box>
			)}
		</Drawer>
	)
}

export default Cart

const sx = {
	root: {
		width: '100%',
		maxWidth: {
			xs: '100vw',
			sm: '100%',
		},
	},
	stickyPanel: {
		zIndex: 100,
		borderTop: '1px solid',
		borderColor: 'divider',
		position: {
			xs: 'fixed',
			sm: 'static',
		},
		bottom: {
			xs: '0',
			sm: 'unset',
		},
		pb: {
			xs: 4,
			sm: 0,
		},
		width: {
			xs: 'calc(100% - 64px)',
			sm: 'unset',
		},
	},
	empty: {
		mt: '100px',
	},
}
