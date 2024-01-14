import React, { useContext } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { Image } from 'webstudio/components'
import { useRouter } from 'next/router'
import { TypographyVariants } from 'webstudio/types'
import { AppContext } from 'webstudio/context'

type CoverImageProps = {
	editing?: boolean
	textVariant?: TypographyVariants
	title?: string
	description?: string
	buttonText?: string
	image?: string
	height?: number
	width?: number
	objectFit?: 'cover' | 'contain'
	alignItems?: 'flex-start' | 'center' | 'flex-end'
	alt?: string
	handleClick?: () => void
	enableGradient?: boolean
	enableOverlay?: boolean
	opacity?: number
	bgcolor?: string
	href?: string
}

const CoverImage: React.FC<CoverImageProps> = (props) => {
	const router = useRouter()
	const { clientUrl } = useContext(AppContext)

	const {
		editing = false,
		title,
		textVariant = 'h1',
		description,
		buttonText,
		handleClick,
		image = null,
		height = 400,
		objectFit = 'cover',
		alt = 'image',
		enableGradient = false,
		enableOverlay = false,
		opacity = 0.5,
		alignItems = 'center',
		bgcolor = '#FFFFFF',
		href,
	} = props

	const handleItemClick = () => {		
		if (handleClick) {
			return handleClick()
		} else if (href) {
			router.push(`${clientUrl}${href}`)
		}
	}

	return (
		<Box sx={sx.root}>
			<Image
				src={image}
				alt={alt}
				height={height}
				objectFit={objectFit}
				disableBorderRadius
				bgcolor={bgcolor}
				enableGradient={enableGradient}
				enableOverlay={enableOverlay}
				opacity={opacity}
			/>
			<Stack
				sx={{
					...sx.stack,
					height: `${height}px`,
				}}
			>
				<Stack
					direction="column"
					spacing={2}
					alignItems={alignItems}
					sx={sx.content}
				>
					{title && (
						<Typography
							variant={textVariant}
							color="text.primary"
							sx={{
								textAlign: alignItems === 'center' ? 'center' : 'left',
							}}
						>
							{title}
						</Typography>
					)}
					{description && (
						<Typography
							variant="body1"
							color="text.primary"
							sx={{
								textAlign: alignItems === 'center' ? 'center' : 'left',
							}}
						>
							{description}
						</Typography>
					)}
					{buttonText && (
						<Box>
							<Button
								size="large"
								onClick={handleItemClick}
								variant="contained"
							>
								{buttonText}
							</Button>
						</Box>
					)}
				</Stack>
			</Stack>
		</Box>
	)
}

export default CoverImage

const sx = {
	root: {
		position: 'relative',
	},
	stack: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
    p: 1,
		maxWidth: '540px',
	},
}
