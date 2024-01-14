import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { Box } from '@mui/material'
import { getCarouselResponsive } from 'webstudio/helpers'
import { useTheme } from '@mui/material/styles'
import CarouselDot from './CarouselDot'
// Note: required global CSS import from _app or app/layout.tsx
// import 'react-multi-carousel/lib/styles.css'

type CarouselProps = {
	children: React.ReactNode
	autoPlay?: boolean
	arrows?: boolean
	showDots?: boolean
	responsive?: any
	styles?: any
}

const ReactCarousel: React.FC<CarouselProps> = (props) => {
	const theme = useTheme()
	const [responsive, setResponsive] = useState<any>(null)

	const {
		children,
		autoPlay = false,
		arrows = false,
		showDots = true,
		styles = {},
	} = props

	useEffect(() => {
		setResponsive(getCarouselResponsive(theme))
	}, [theme?.breakpoints])

	return (
		<Box
			sx={{
				...sx.root,
				...(styles && styles),
			}}
		>
			{responsive && children && (
				<Carousel
					responsive={responsive}
					swipeable
					draggable
					infinite
					autoPlay={autoPlay}
					arrows={arrows}
					showDots={showDots}
					customDot={<CarouselDot />}
				>
					{children}
				</Carousel>
			)}
		</Box>
	)
}

export default ReactCarousel

const sx = {
	root: {
		width: '100%',
	},
}
