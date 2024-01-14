import React from 'react'
import { Stack } from '@mui/material'
import { TextInput } from 'webstudio/components'

type AddressFormProps = {
	address: any
	handleChange: any
}

const AddressForm: React.FC<AddressFormProps> = (props) => {
	const { address, handleChange } = props

	return (
		<Stack spacing={1}>
			<TextInput
				placeholder="First name"
				name="firstName"
				value={address?.firstName || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="Last name"
				name="lastName"
				value={address?.lastName || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="Street Address Line 1"
				name="address1"
				value={address?.address1 || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="Street Address Line 2"
				name="address2"
				value={address?.address2 || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="City"
				name="city"
				value={address?.city || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="State"
				name="province"
				value={address?.province || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="Country"
				name="country"
				value={address?.country || ''}
				handleChange={handleChange}
			/>
			<TextInput
				placeholder="ZIP Code"
				name="zip"
				value={address?.zip || ''}
				handleChange={handleChange}
			/>
		</Stack>
	)
}

export default AddressForm
