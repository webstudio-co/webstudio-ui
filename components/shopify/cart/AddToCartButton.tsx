import React, { useState, useContext } from 'react'
import { useCart } from '@webstudio/shopify'
import { useSegment } from 'webstudio/hooks/addons'
import { useAlerts } from 'webstudio/hooks'
import { Stack, Button } from '@mui/material'
import { IconLoader } from 'webstudio/components'
import { FavoriteButton, QuantitySelector, SubscriptionSelector } from 'webstudio/components/shopify'
import { ShopContext } from '@webstudio/shopify'
import { Product, ProductVariant } from '@webstudio/shopify'

type AddToCartButtonProps = {
	product: Product
	variant: ProductVariant
	buttonVariant?: 'contained' | 'outlined' | 'text'
	label?: string
	enableQuantity?: boolean
  enableSubscription?: boolean
  enableFavorites?: boolean
	size?: 'small' | 'medium' | 'large'  
}

const AddToCartButton: React.FC<AddToCartButtonProps> = (props) => {
	
  const { showAlertError } = useAlerts()
  const { trackAddToCart } = useSegment()
	const { toggleCart } = useContext(ShopContext)
	const { loading, cartLineAdd } = useCart()

	const {
		size = 'large',
		label = 'Add to Cart',
		product,
		variant,
		buttonVariant = 'contained',
		enableQuantity = false,
    enableSubscription = false,
    enableFavorites = false,
	} = props

	const [quantity, setQuantity] = useState<number>(1)
  const [activeSellingPlanId, setActiveSellingPlanId] = useState<any>(null)

  const handleSellingPlanChange = (ev) => {
    const { value } = ev.target
    setActiveSellingPlanId(value)
  }

	const handleAddQuantity = () => {
		setQuantity(quantity + 1)
	}

	const handleRemoveQuantity = () => {
		if (quantity <= 1) return
		setQuantity(quantity - 1)
	}

	const handleAddToCart = async () => {
		if (!product?.availableForSale) {      
			showAlertError('Please select all options')
			return
		}
		if (product?.availableForSale && variant?.id) {
			let line = {
				merchandiseId: variant?.id,
				quantity,
        sellingPlanId: activeSellingPlanId
			}
			cartLineAdd(line)
			trackAddToCart({
				quantity: quantity,
				variant: variant,
				product: product,
			})
			setTimeout(() => toggleCart(), 500)
		}
	}

	if (!product) return null
	return (
		<Stack direction="column" spacing={1}>
      { enableSubscription && (
        <SubscriptionSelector 
          product={product}
          activeSellingPlanId={activeSellingPlanId}
          handleChange={handleSellingPlanChange}
        />
      )}
      <Stack direction="row" spacing={0.5}>
        {enableQuantity && (
          <QuantitySelector
            size={size}
            quantity={quantity}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
          />
        )}
        <Button
          fullWidth
          sx={{
            ...sx.addToCartButton,
            ...(size == 'small' && sx.addToCartButtonSmall),
          }}
          color="primary"
          onClick={handleAddToCart}
          variant={buttonVariant}
          size={size}
          disabled={!variant || !product?.availableForSale}
          startIcon={
            <IconLoader
              color={
                buttonVariant == 'contained'
                  ? 'primary.contrastText'
                  : 'primary.main'
              }
              loading={loading}
            />
          }
        >
          {label}
        </Button>
        { enableFavorites && (
          <FavoriteButton 
            product={product}        
          />  
        )}
      </Stack>
    </Stack>
	)
}

export default AddToCartButton

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		gap: '10px',
	},
  addToCartButton: {},
	addToCartButtonSmall: {
		height: '40px',
	},
}
