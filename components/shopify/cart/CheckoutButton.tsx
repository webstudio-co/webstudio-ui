import React, { useState } from 'react'
import { useCart } from '@webstudio/shopify/hooks'
import { useSegment } from 'webstudio/hooks/addons'
import { Button } from '@mui/material'
import { IconLoader } from 'webstudio/components'

type CheckoutButtonProps = {
	size?: 'small' | 'medium' | 'large'
}

const CheckoutButton: React.FC<CheckoutButtonProps> = (props) => {
	const { size = 'large' } = props
	const [loading, setLoading] = useState(false)
	const { cart } = useCart()

	const { trackCheckoutStarted } = useSegment()

	const handleCheckoutClick = () => {
		setLoading(true)
		setTimeout(() => redirectToWebUrl(), 500)
	}

	const redirectToWebUrl = () => {
		trackCheckoutStarted(cart)
		window.location = cart?.checkoutUrl
		setLoading(false)
	}

	return (
		<Button
			fullWidth
			color="primary"
			onClick={handleCheckoutClick}
			variant="contained"
			size={size}
			endIcon={<IconLoader loading={loading} />}
		>
			Checkout
		</Button>
	)
}

export default CheckoutButton
