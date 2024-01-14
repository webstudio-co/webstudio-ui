import React from 'react'
import {
	SegmentProvider,	
} from 'webstudio/context'
import { ShopProvider, ProductProvider, CollectionProvider } from '@webstudio/shopify'
import { Cart, SearchModal } from 'webstudio/components/shopify'

type ShopifyStoreProps = {
	domain: string
	storefrontAccessToken: string
	segmentWriteKey?: string
	logo?: string
	authCookie: string
	shopUrl: string
	children: any
}

const ShopifyStore: React.FC<ShopifyStoreProps> = (props) => {
	const {
		children,
		logo,
		domain,
		shopUrl,
		authCookie,
		storefrontAccessToken,
		segmentWriteKey,
	} = props

	return (
		<ShopProvider
			logo={logo}
			domain={domain}
			authCookie={authCookie}
			shopUrl={shopUrl}
			storefrontAccessToken={storefrontAccessToken}
		>
			<SegmentProvider writeKey={segmentWriteKey}>
				<Cart />
				<SearchModal />
				<ProductProvider>
					<CollectionProvider>{children}</CollectionProvider>
				</ProductProvider>
			</SegmentProvider>
		</ShopProvider>
	)
}

export default ShopifyStore
