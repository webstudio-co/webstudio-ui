import React, { useState } from 'react'
import { Button } from '@mui/material'
import {
	VerifyPinForm,
	VerifySendPinForm,
	AuthScreen,
	LayoutLoader,
} from 'webstudio/components/ui'
import { useAuth } from 'webstudio/hooks'
import { useRouter } from 'next/router'

type VerifyPinProps = {
	logo: string
	title?: string
	subtitle?: string
	redirectUrl: string
	loginUrl: string
	authConfig?: Record<string, any>
}

const VerifyPin: React.FC<VerifyPinProps> = (props) => {
	const {
		logo,
		title,
		subtitle,
		redirectUrl,
		loginUrl,
		authConfig = {},
	} = props || {}

	const [showVerifyPin, setShowVerifyPin] = useState(false)

	const { loading, errors, user, setUser, handleChange, sendPin, verifyPin } =
		useAuth()

	const router = useRouter()

	const handleSendPin = async () => {
		let resp = await sendPin({
			...user,
			...authConfig,
		})
		if (resp?.id) {
			setShowVerifyPin(true)
		}
	}

	const handleVerifyPin = async () => {
		let resp = await verifyPin(user?.email, user?.pin)
		if (resp?.id) {
			router.push(redirectUrl)
		}
	}

	const handleResendPin = async () => {
		setUser({
			...user,
			pin: '',
		})
		await sendPin({
			...user,
			...authConfig,
		})
	}

	const handleLogin = () => {
		router.push(loginUrl)
	}

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				{!showVerifyPin ? (
					<VerifySendPinForm
						errors={errors}
						user={user}
						handleChange={handleChange}
						handleSubmit={handleSendPin}
					/>
				) : (
					<VerifyPinForm
						errors={errors}
						user={user}
						handleChange={handleChange}
						handleSubmit={handleVerifyPin}
						handleResendPin={handleResendPin}
					/>
				)}
				{loginUrl && (
					<Button
						sx={sx.button}
						fullWidth
						onClick={handleLogin}
						color="primary"
					>
						Back to login
					</Button>
				)}
			</AuthScreen>
		</LayoutLoader>
	)
}

export default VerifyPin

const sx = {
	button: {
		mt: 1,
	},
}
