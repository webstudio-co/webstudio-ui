import { Button } from '@mui/material'
import Image from 'next/image'
import EmptyImage from './NoImage'

const LOGO_WIDTH = 100
const LOGO_HEIGHT = 50

type LogoProps = {
	src?: string
	width?: number
	height?: number
	handleClick: () => void
}

const Logo: React.FC<LogoProps> = (props) => {
	const {
		src,
		width = LOGO_WIDTH,
		height = LOGO_HEIGHT,
		handleClick,
	} = props || {}

	return (
		<Button disableRipple sx={sx.root} onClick={handleClick}>
			{src?.length > 1 ? (
				<Image
					src={src}
					alt="logo"
					width={width ? Number(width) : LOGO_WIDTH}
					height={height ? Number(height) : LOGO_HEIGHT}
					//@ts-ignore
					style={styles.image}
				/>
			) : (
				<EmptyImage
					width={width ? Number(width) : LOGO_WIDTH}
					height={height ? Number(height) : LOGO_HEIGHT}
				/>
			)}
		</Button>
	)
}

export default Logo

const sx = {
	root: {
		width: '100%',
		minHeight: 'auto',
		minWidth: 'auto',
		'&:hover': {
			background: 'transparent',
		},
	},
}

const styles = {
	image: {
		objectFit: 'contain',
	},
}
