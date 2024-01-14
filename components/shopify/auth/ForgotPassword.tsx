import React from 'react'
import { AuthScreen, LayoutLoader } from 'webstudio/components'
import { ForgotPasswordForm } from 'webstudio/components/shopify'
import { useAlerts, useAuth } from 'webstudio/hooks/shopify'
import { useRouter } from 'next/router'

type ForgotPasswordProps = {
	logo: any
	title?: string
	subtitle?: string
	loginUrl?: string
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
	const { logo, title, subtitle, loginUrl } = props || {}

	const { showAlertSuccess } = useAlerts()

	const {
		loading,
		errors,
		customer,
		setCustomer,
		handleChange,
		forgotPassword,
	} = useAuth()

	const router = useRouter()

	const handleSubmit = async () => {
		let resp = await forgotPassword(customer?.email)
		if (resp?.id) {
			setCustomer({ emal: '' })
			showAlertSuccess('Password reset instructions sent')
		}
	}

	const handleLogin = () => {
		router.push(loginUrl)
	}

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				<ForgotPasswordForm
					errors={errors}
					customer={customer}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					handleLogin={handleLogin}
				/>
			</AuthScreen>
		</LayoutLoader>
	)
}

export default ForgotPassword
