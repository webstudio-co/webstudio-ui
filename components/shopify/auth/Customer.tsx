import React, { useEffect } from 'react'
import { AuthScreen, LayoutLoader } from 'webstudio/components'
import { useCustomers } from '@webstudio/shopify/hooks'
import { CustomerForm } from 'webstudio/components/shopify'

type CustomerProps = {
	logo: string
	title?: string
	subtitle?: string
}

const Customer: React.FC<CustomerProps> = (props) => {
	const {
		logo,
		title = 'Customer details',
		subtitle = 'Update your account',
	} = props || {}

	const {
		errors,
		loading,
		customer,
		handleChange,
		fetchCustomer,
		updateCustomer,
	} = useCustomers()

	const handleSubmit = async () => {
		await updateCustomer({
			email: customer?.email,
			firstName: customer?.firstName,
			lastName: customer?.lastName,
			phone: customer?.phone,
			acceptsMarketing: customer?.acceptsMarketing,
		})
	}

	useEffect(() => {
		if (!customer?.email) {
			fetchCustomer()
		}
	}, [customer])

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				<CustomerForm
					loading={loading}
					customer={customer}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			</AuthScreen>
		</LayoutLoader>
	)
}

export default Customer
