import React from 'react'
import { Button } from '@mui/material'
import { Repeat } from '@mui/icons-material'
import { FieldWrapper } from 'webstudio/components/ui'

type FieldReferenceProps = {
	value?: any
	displayValue?: any
	headerName?: any
	handleClick?: () => void
	label?: string
	rest?: any
}

const FieldReference: React.FC<FieldReferenceProps> = (props) => {
	const { value, label, handleClick, ...rest } = props

	return (
		<FieldWrapper label={label} {...rest}>
			<Button
				color="primary"
				variant="outlined"
				sx={sx.button}
				endIcon={<Repeat />}
				onClick={handleClick}
			>
				{value}
			</Button>
		</FieldWrapper>
	)
}

export default FieldReference

const sx = {
	cell: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-start',
	},
	avatar: {
		bgcolor: 'background.paper',
	},
	button: {
		textTransform: 'none',
		fontFamily: (theme) => theme.typography.body2.fontFamily,
		letterSpacing: 0,
	},
}
