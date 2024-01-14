import React, { useState } from 'react'
import { CoverVert, VideoModal } from 'webstudio/components'
import { CardProps } from 'webstudio/types'
import { VIDEO_VERT_HEIGHT, VIDEO_VERT_WIDTH } from 'webstudio/constants'
import VideoPlayer from './VideoPlayer'

const VideoVert: React.FC<CardProps> = (props) => {
	const {
		editing,
		label,
		title,
		image = '',
		video = '',
		href,
		handleClick,
		buttonText,
		textVariant = 'subtitle1',
		objectFit = 'cover',
		height = VIDEO_VERT_HEIGHT,
		width = VIDEO_VERT_WIDTH,
		enableBorder = false,
		enableGradient = false,
		enableOverlay = false,
	} = props || {}

	const [open, setOpen] = useState(false)

	const handleItemClick = () => {
		setOpen(true)
	}

	return !open ? (
		<CoverVert
			title={title}
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
			icon="PlayCircle"
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

const sx = {
	video: {
		width: '100%',
		height: '100%',
	},
}
