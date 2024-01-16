import React from 'react'
import { Box, Typography, Button, Tooltip } from '@mui/material'
import { useProductContext } from '@webstudio/shopify/hooks'
import Image from 'next/image'
import { findVariantByColor } from 'webstudio/helpers'

type ColorVariantsOptionsProps = {
	name: string
	values: any
	selected: string
	handleChange: any
	styles?: any
}

const ColorVariantsOptions: React.FC<ColorVariantsOptionsProps> = (props) => {
	const { name, values, selected, handleChange } = props

	const { product } = useProductContext()

	return (
		<Box sx={sx.root}>
			<Box sx={sx.options}>
				{values?.map((value) => {
					let variant = findVariantByColor(product, value)
					return (
						<Button
							sx={{
								...sx.button,
								...(selected === value && sx.activeButton),
							}}
							onClick={() => handleChange(name, value)}
						>
							<Image
								height={64}
								width={64}
								src={variant?.image?.url}
								alt={variant?.image?.altText}
								style={{
									objectFit: 'contain',
								}}
							/>
						</Button>
					)
				})}
			</Box>
		</Box>
	)
}

export default ColorVariantsOptions

const sx = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	options: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: '10px',
	},
	button: {
		border: '2px solid transparent',
		'&:hover': {
			bgcolor: 'transparent',
			opacity: 0.85,
		},
	},
	activeButton: {
		opacity: 1,
		border: '2px solid',
		borderColor: 'primary.main',
	},
}
