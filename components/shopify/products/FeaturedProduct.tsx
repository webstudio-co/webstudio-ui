import React, { useState, useEffect } from 'react'
import { AddToCartButton, QuickShopButton } from 'webstudio/components/shopify'
import { Button, Box, Stack, Typography } from '@mui/material'
import { truncate } from 'webstudio/helpers'
import { FEATURED_CARD_HEIGHT, FEATURED_CARD_WIDTH } from 'webstudio/constants'
import SwipeableProductImages from './images/SwipeableProductImages'
import { formatCurrency } from '@webstudio/shopify/helpers'
import { useProducts } from '@webstudio/shopify/hooks'

type FeaturedProductProps = {
	handle: string
	flexDirection?: 'row' | 'row-reverse'
	handleClick?: () => void
	buttonText?: string
	quickShopButtonText?: string
	height?: number
	width?: number
	enableBorder?: boolean
	enableAddToCart?: boolean
	enableQuantity?: boolean
	enableQuickShop?: boolean
}

const FeaturedProduct: React.FC<FeaturedProductProps> = (props) => {
	const {
		handle,
		flexDirection = 'row',
		height = FEATURED_CARD_HEIGHT,
		width = FEATURED_CARD_WIDTH,
		buttonText = 'Add to Cart',
		quickShopButtonText = 'Quick Shop',
		handleClick,
		enableBorder = false,
		enableAddToCart = false,
		enableQuantity = false,
		enableQuickShop = false,
	} = props || {}

	const { loading, product, fetchProduct } = useProducts()

	const handleItemClick = () => {
		if (handleClick) {
			return handleClick()
		}
	}

	useEffect(() => {
		if (handle) {
			fetchProduct(handle)
		}
	}, [handle])

	if (!product) return null
	return (
		<Box
			sx={{
				...sx.root,
				...(enableBorder && sx.rootBorder),
			}}
		>
			<Stack direction={{ sm: flexDirection, sx: 'column' }}>
				<Box sx={sx.images}>
					<SwipeableProductImages
						product={product}
						height={height}
						width={width}
						handleClick={handleItemClick}
					/>
				</Box>
				<Stack spacing={2} sx={sx.content}>
					<Box>
						<Typography color="textPrimary" variant="h3">
							{product?.title}
						</Typography>
						<Typography
							color="textSecondary"
							variant="body2"
							sx={sx.description}
						>
							{truncate(product?.description, 60)}
						</Typography>
						<Typography color="textSecondary" variant="body2">
							{formatCurrency(product?.priceRange?.minVariantPrice?.amount)}
						</Typography>
					</Box>
					<Stack
						direction={
							enableAddToCart && enableQuickShop && !enableQuantity
								? 'row'
								: 'column'
						}
						spacing={1}
					>
						{enableAddToCart && (
							<AddToCartButton
								product={product}
								variant={product?.variants?.edges[0]?.node}
								enableQuantity={enableQuantity}
								label={buttonText}
							/>
						)}
						{enableQuickShop && (
							<QuickShopButton
								size="large"
								product={product}
								buttonVariant={enableAddToCart ? 'text' : 'contained'}
								buttonText={buttonText}
								quickShopButtonText={quickShopButtonText}
							/>
						)}
					</Stack>
				</Stack>
			</Stack>
		</Box>
	)
}

export default FeaturedProduct

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
		overflow: 'hidden',
	},
	rootBorder: {
		border: '1px solid',
		borderColor: 'divider',
	},
	content: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		height: '100%',
	},
	description: {
		maxWidth: '320px',
	},
	images: {
		px: 1,
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
}
