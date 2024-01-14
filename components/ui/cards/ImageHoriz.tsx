import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { AppContext } from 'webstudio/context/core'
import { Image, TouchableOpacity } from 'webstudio/components'
import { useRouter } from 'next/router'
import { IMAGE_HORIZ_HEIGHT } from 'webstudio/constants'
import { CardProps } from 'webstudio/types'

const ImageHoriz: React.FC<CardProps> = (props) => {
	const { clientUrl } = useContext(AppContext)
	const {
		title,
		image = '',
		href,
		height = IMAGE_HORIZ_HEIGHT,
		handleClick,
		objectFit = 'cover',
		enableGradient = false,
		enableOverlay = false,
	} = props || {}

	const router = useRouter()

	const handleItemClick = () => {
		if (handleClick) {
			return handleClick()
		} else if (href) {
			router.push(`${clientUrl}${href}`)
		}
	}

	return (
		<Box
			sx={{
				...sx.root,
				...(enableGradient && sx.gradient),
			}}
		>
			<TouchableOpacity handleClick={handleItemClick}>
				<Image
					src={image}
					height={height}
					objectFit={objectFit}
					alt={title}
					enableGradient={enableGradient}
					enableOverlay={enableOverlay}
				/>
			</TouchableOpacity>
		</Box>
	)
}

export default ImageHoriz

const sx = {
	root: {
		position: 'relative',
		flexDirection: 'column',
		overflow: 'hidden',
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
	},
	gradient: {
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			left: 0,
			width: '100%',
			height: '50%',
			background: 'linear-gradient(to top, rgb(0,0,0,0.5), transparent)',
		},
	},
}
