import React from 'react'
import { Button, Stack } from '@mui/material'
import { IconLoader, TextInput } from 'webstudio/components'

type SendPinFormProps = {
	errors: Record<string, any>
	loading?: boolean
	user: Record<string, any>
	handleChange: (ev: any) => void
	handleSubmit: () => void
}

const SendPinForm: React.FC<SendPinFormProps> = (props) => {
	const { errors, loading, user, handleChange, handleSubmit } = props

	return (
		<Stack spacing={1}>
			<TextInput
				errors={errors}
				name="email"
				value={user?.email}
				placeholder="Enter your email"
				handleChange={handleChange}
			/>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={handleSubmit}
				startIcon={<IconLoader loading={loading} />}
			>
				Send Verification Pin
			</Button>
		</Stack>
	)
}

export default SendPinForm
