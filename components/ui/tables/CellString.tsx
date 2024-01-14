import React from 'react'
import { Typography } from '@mui/material'
import { truncate } from 'webstudio/helpers'
import { TypographyVariants } from 'webstudio/types'

type CellStringProps = {
	value: string
	variant?: TypographyVariants
}

const CellString: React.FC<CellStringProps> = (props) => {
	const { value, variant = 'caption' } = props
	return (
		<Typography sx={sx.text} variant={variant}>
			{truncate(value, 15)}
		</Typography>
	)
}

export default CellString

const sx = {
	text: {
		whiteSpace: 'nowrap',
	},
}
