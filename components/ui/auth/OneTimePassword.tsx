import React from 'react'
import { AuthScreen, LayoutLoader } from 'webstudio/components/ui'
import { useAuth } from 'webstudio/hooks'
import { OneTimePasswordForm } from 'webstudio/components/ui'
import { useRouter } from 'next/router'

type OneTimePasswordProps = {
	logo: string
	redirectUrl: string
	title?: string
	subtitle?: string
	loginUrl?: string
	authConfig?: Record<any, string>
}

const OneTimePassword: React.FC<OneTimePasswordProps> = (props) => {
	const {
		logo,
		redirectUrl,
		title = 'One-Time Password',
		subtitle = 'Get a one-time password link',
		loginUrl,
		authConfig = {},
	} = props || {}

	const router = useRouter()

	const { errors, loading, user, handleChange, sendOneTimePassword } = useAuth()

	const handleSubmit = async () => {
		let resp = await sendOneTimePassword({
			...user,
			...authConfig,
		})
		if (resp?.id) {
			router.push(redirectUrl)
		}
	}

	const handleLogin = () => {
		router.push(loginUrl)
	}

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				<OneTimePasswordForm
					loading={loading}
					errors={errors}
					user={user}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleLogin={handleLogin}
				/>
			</AuthScreen>
		</LayoutLoader>
	)
}

export default OneTimePassword
