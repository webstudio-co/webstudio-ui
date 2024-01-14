import React from 'react'
import { Image } from 'webstudio/components/ui'
import { IMAGE_HORIZ_HEIGHT, IMAGE_HORIZ_WIDTH } from 'webstudio/constants'

type FieldImageProps = {
	value?: any
	label?: string
	rest?: any
	handleClick?: () => void
	objectFit?: 'cover' | 'contain'
}

const FieldImage: React.FC<FieldImageProps> = (props) => {
	const { value, objectFit = 'cover' } = props
	return <Image src={value} height={IMAGE_HORIZ_HEIGHT} objectFit={objectFit} />
}

export default FieldImage
