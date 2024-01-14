import React from 'react'
import { NoImage } from 'webstudio/components/ui'
import { imageFromVideoUrl } from 'webstudio/helpers'
import Image from 'next/image'

type CellImageProps = {
	value: string
	handleClick?: (value?: string) => void
	size?: number
}

const CellImage: React.FC<CellImageProps> = (props) => {
	const { value, size = 64 } = props
	let src = imageFromVideoUrl(value)
	if (!value) return <NoImage height={size} width={size} />
	return (
		<Image
			src={src}
			width={size}
			height={size}
			alt={'Image'}
			quality={100}
			style={{
				objectFit: 'contain',
			}}
		/>
	)
}

export default CellImage
