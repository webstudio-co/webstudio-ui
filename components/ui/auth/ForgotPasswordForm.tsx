import React from 'react'
import { Button, Stack } from '@mui/material'
import { IconLoader, TextInput } from 'webstudio/components'

type ForgotPasswordFormProps = {
	errors: any
	loading?: boolean
	user: any
	handleChange: (e: any) => void
	handleSubmit: () => void
	handleLogin?: () => void
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
	const { errors, loading, user, handleChange, handleSubmit, handleLogin } =
		props

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
				Send Instructions
			</Button>
			{handleLogin && (
				<Button fullWidth color="primary" onClick={handleLogin}>
					Back to Login
				</Button>
			)}
		</Stack>
	)
}

export default ForgotPasswordForm
