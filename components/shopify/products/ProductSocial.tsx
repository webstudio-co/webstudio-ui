import React, { useEffect, useContext } from 'react'
import { Stack } from '@mui/material'
import { LikeButton, FavoriteButton, ShareButton } from 'webstudio/components'
import { useProductContext } from '@webstudio/shopify/hooks'
import { useRouter } from 'next/router'
import { useResource } from 'webstudio/hooks'
import { ShopContext } from 'webstudio/context'

type ProductSocialProps = {
	enableLikes?: boolean
	enableShares?: boolean
	enableFavorites?: boolean
}

const ProductSocial: React.FC<ProductSocialProps> = (props) => {
	const router = useRouter()
	const { app_id: appId } = router.query

	const { shopUrl } = useContext(ShopContext)

	const {
		enableLikes = true,
		enableShares = true,
		enableFavorites = true,
	} = props

	const { loading, resource, findOne } = useResource({
		url: `/api/v1/cms/products`,
	})

	const { product } = useProductContext()

	useEffect(() => {
		if (product?.handle && appId) {
			findOne(product?.handle)
		}
	}, [product?.handle, appId])

	if (!resource?.id) return null
	return (
		<Stack direction="row" spacing={1}>
			{enableLikes && (
				<LikeButton handle={product?.handle} url={`/api/v1/products`} />
			)}
			{enableFavorites && (
				<FavoriteButton handle={product?.handle} url={`/api/v1/products`} />
			)}
			{enableShares && <ShareButton url={`${shopUrl}/${product?.handle}`} />}
		</Stack>
	)
}

export default ProductSocial
