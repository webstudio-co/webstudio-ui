import React, { useState, useContext, useEffect } from 'react'
import {
	Modal,
	LoginForm,
	SignupForm,
	ForgotPasswordForm,
	VerifyPinForm,
	VerifySendPinForm,
	SquareLogo,
} from 'webstudio/components'
import { useAuth } from 'webstudio/hooks'
import { useRouter } from 'next/router'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { AppContext } from 'webstudio/context'

type AuthModalProps = {
	logo: any
	disableUsername?: boolean
}

const AuthModal: React.FC<AuthModalProps> = (props) => {
	const router = useRouter()
	const { app_id: appId } = router.query

	const { authOpen, setAuthOpen } = useContext(AppContext)

	const { logo, disableUsername = false } = props || {}

	const {
		errors,
		loading,
		user,
		handleChange,
		login,
		signup,
		forgotPassword,
		verifyPin,
		sendPin,
	} = useAuth()

	const [tab, setTab] = useState(0)

	const handleTabChange = (ev, newValue) => {
		setTab(newValue)
	}

	const handleSubmit = async () => {
		let resp
		switch (tab) {
			case 0:
				resp = await login(user)
				break
			case 1:
				resp = await signup({
					...user,
					app_id: appId,
				})
				break
			case 2:
				await sendPin({
					...user,
					app_id: appId,
				})
				setTab(3)
				break
			case 3:
				resp = await verifyPin(user?.email, user?.pin)
				break
			case 4:
				resp = await sendPin({
					...user,
					app_id: appId,
				})
				setTab(3)
				break
		}
		if (tab !== 4 && resp?.id) {
			setAuthOpen(false)
		}
	}

	const handleSignup = () => {
		setTab(1)
	}

	const handleLogin = () => {
		setTab(0)
	}

	const handleForgotPassword = () => {
		setTab(2)
	}

	const handleResendPin = () => {
		setTab(4)
	}

	useEffect(() => {
		if (authOpen) {
			setTab(0)
		}
	}, [authOpen])

	return (
		<Modal open={authOpen} handleClose={() => setAuthOpen(false)} p={4}>
			<Box sx={sx.logo}>
				<SquareLogo src={logo} />
			</Box>
			<Tabs
				variant="fullWidth"
				value={tab}
				onChange={handleTabChange}
				sx={sx.tabs}
			>
				<Tab label="Login" />
				<Tab label="Sign Up" />
			</Tabs>
			{tab === 0 && (
				<LoginForm
					errors={errors}
					loading={loading}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleSignup={handleSignup}
					handleForgotPassword={handleForgotPassword}
				/>
			)}
			{tab === 1 && (
				<SignupForm
					errors={errors}
					loading={loading}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleLogin={handleLogin}
				/>
			)}
			{tab === 2 && (
				<ForgotPasswordForm
					errors={errors}
					loading={loading}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleLogin={handleLogin}
				/>
			)}
			{tab === 3 && (
				<VerifyPinForm
					errors={errors}
					loading={loading}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleResendPin={handleResendPin}
				/>
			)}
			{tab === 4 && (
				<VerifySendPinForm
					errors={errors}
					loading={loading}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			)}
		</Modal>
	)
}

export default AuthModal

const sx = {
	logo: {
		display: 'flex',
		justifyContent: 'center',
	},
	tabs: {
		mb: 2,
	},
}
