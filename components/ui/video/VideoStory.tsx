import React, { useState } from 'react'
import { AvatarVert, VideoModal } from 'webstudio/components'
import { CardProps } from 'webstudio/types'
import { VIDEO_VERT_HEIGHT, VIDEO_VERT_WIDTH } from 'webstudio/constants'

const VideoVert: React.FC<CardProps> = (props) => {
	const {
		editing,
		label,
		title,
		image = '',
		video = '',
		buttonText,
		textVariant = 'subtitle1',
		objectFit = 'cover',
		height = 80,
		width = 80,
		enableBorder = false,
		enableGradient = false,
		enableOverlay = false,
	} = props || {}

	const [open, setOpen] = useState(false)

	const handleItemClick = () => {
		setOpen(true)
	}

	return !open ? (
		<AvatarVert
			image={image}
			handleClick={handleItemClick}
			buttonText={buttonText}
			textVariant={textVariant}
			objectFit={objectFit}
			height={height}
			width={width}
			enableBorder={enableBorder}
			enableGradient={enableGradient}
			enableOverlay={enableOverlay}
		/>
	) : (
		<VideoModal
			open={open}
			title={title}
			src={video}
			handleClose={() => setOpen(false)}
		/>
	)
}

export default VideoVert
