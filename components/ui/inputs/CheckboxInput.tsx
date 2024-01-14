import React from 'react'
import { Checkbox, Box, FormControlLabel, Typography } from '@mui/material'

type CheckboxInputProps = {
	name: string
	value: boolean
	placeholder: string
	label: string
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	disableBorder?: boolean
}

const CheckboxInput = (props) => {
	const {
		name,
		value,
		placeholder,
		label,
		handleChange,
		disableBorder = false,
	} = props

	const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const value = ev.target.checked
		handleChange({
			target: {
				name,
				value,
			},
		})
	}

	return (
		<Box>
			<Typography variant="caption" color="textSecondary">
				{label}
			</Typography>
			<Box
				sx={{
					...sx.input,
					...(!disableBorder && sx.border),
				}}
			>
				<FormControlLabel
					control={
						<Checkbox
							name={name}
							checked={value == true ? true : false}
							onChange={handleCheckboxChange}
							value="true"
						/>
					}
					label={
						<Typography variant="body2" color="textSecondary">
							{placeholder}
						</Typography>
					}
				/>
			</Box>
		</Box>
	)
}

export default CheckboxInput

const sx = {
	input: {
		display: 'flex',
		direction: 'column',
		fontSize: 15,
	},
	border: {
		border: (theme) => `1px solid ${theme.palette.divider}`,
		boxShadow: `rgb(0 0 0 / 5%) 0px 2px 4px !important`,
		pt: 0.5,
		pr: 2,
		pb: 0.5,
		pl: 2,
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
	},
}
