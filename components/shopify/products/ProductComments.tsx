import React from 'react'
import { Comments } from 'webstudio/components'

type ProductCommentsProps = {
	handle: string
}

const ProductComments: React.FC<ProductCommentsProps> = (props) => {
	const { handle } = props
	return <Comments handle={handle} url="/api/v1/products" />
}

export default ProductComments
