
import React, { useContext } from 'react'
import { Grid, Box } from '@mui/material'
import { ProductCardVert } from 'webstudio/components/shopify'
import { useRouter } from 'next/router'
import { useSegment } from 'webstudio/hooks/shopify'
import { Product } from 'webstudio/types/shopify'
import { AppContext } from 'webstudio/context'

type ProductGridProps = {
	editing?: boolean
  loading?: boolean
	products: Product[]	
	xs?: number
	sm?: number
	md?: number
	lg?: number
	xl?: number
	productComponent?: React.FC<any>
  buttonText?: string
	enableBorder?: boolean
	enableAddToCart?: boolean
	enableQuickShop?: boolean
	enableQuantity?: boolean
  enableOkendoStarRating?: boolean
}

const ProductGrid: React.FC<ProductGridProps> = (props) => {
	const { clientUrl } = useContext(AppContext)

	const {
		editing = false,
		products,
		xs = 12,
		sm = 6,
		md = 4,
		lg = 4,
		xl = 4,
		productComponent: ProductComponent = ProductCardVert,
    buttonText = 'Add to cart',
		enableBorder = false,
		enableAddToCart,
		enableQuickShop,
		enableQuantity,
    enableOkendoStarRating
	} = props

	const router = useRouter()
	const { trackProductClicked } = useSegment()

	const handleClick = (product) => {
		if (!editing) trackProductClicked(product);
		const url = `${clientUrl}/products/${product?.handle}`
		router.push(url)
	}

	return (
		<Grid container spacing={0}>
			{products?.map((product) => (
				<Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product?.id}>
          <Box sx={ sx.item } key={product?.id}>
					<ProductComponent
						product={product}
						handleClick={() => handleClick(product)}
						enableBorder={enableBorder}
						enableAddToCart={enableAddToCart}
						enableQuickShop={enableQuickShop}
						enableQuantity={enableQuantity}
            enableOkendoStarRating={enableOkendoStarRating}
            buttonText={buttonText}
					/>
          </Box>
				</Grid>
			))}
		</Grid>
	)
}

export default ProductGrid

const sx = {
  item: {
    p: 0.5
  }
}