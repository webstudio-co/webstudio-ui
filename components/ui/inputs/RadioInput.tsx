import React from 'react'
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import { SelectInputProps } from 'webstudio/types'

const RadioInput: React.FC<SelectInputProps> = (props) => {
	const { label, name, value, options, handleChange } = props

	return (
		<FormControl fullWidth component="fieldset">
			<Typography variant="caption" color="text.secondary" gutterBottom>
				{label}
			</Typography>
			<RadioGroup name={name} value={String(value)} onChange={handleChange}>
				{options?.map((option, idx) => (
					<FormControlLabel
						key={idx}
						value={String(option.value)}
						control={<Radio />}
						label={<Typography variant="body2">{option.label}</Typography>}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}

export default RadioInput
