import React from 'react'
import { Box, alpha, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import { InputProps, SyntheticEvent } from 'webstudio/types'
import { StarBorderOutlined, Star } from '@mui/icons-material'

type RatingInputProps = InputProps & {
	readOnly?: boolean
	disableBorder?: boolean
	size?: 'small' | 'medium' | 'large'
	label?: string
	value?: number
	handleChange?: (e: SyntheticEvent) => void
}

const RatingInput: React.FC<RatingInputProps> = (props) => {
	const {
		label,
		value,
		name,
		handleChange,
		disableBorder = false,
		readOnly = false,
		size,
	} = props

	const onChange = (event, value) => {
		handleChange({
			target: {
				name,
				value,
			},
		})
	}

	return (
		<Box>
			{label && (
				<Typography variant="caption" color="textSecondary">
					{label}
				</Typography>
			)}
			<Box
				sx={{
					...sx.input,
					...(!disableBorder && sx.border),
				}}
			>
				<Rating
					name={name}
					readOnly={readOnly}
					onChange={onChange}
					size={size}
					value={parseInt(value)}
					icon={<Star sx={sx.rating} />}
					emptyIcon={<StarBorderOutlined sx={sx.emptyRating} />}
				/>
			</Box>
		</Box>
	)
}

export default RatingInput

const sx = {
	input: {
		fontSize: 15,
		'&:focus': {
			boxShadow: `${alpha('#999999', 0.25)} 0 0 0 0.2rem`,
			borderColor: 'primary.light',
		},
	},
	rating: {
		color: 'primary.main',
	},
	emptyRating: {
		color: 'text.secondary',
	},
	border: {
		pt: 1,
		pr: 2,
		pb: 0.5,
		pl: 2,
		bgcolor: 'background.paper',
		borderRadius: (theme) => theme.shape.borderRadius,
		border: '1px solid',
		borderColor: 'divider',
		boxShadow: `rgb(0 0 0 / 5%) 0px 2px 4px !important`,
	},
}
