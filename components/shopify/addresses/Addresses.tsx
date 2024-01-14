import React, { useContext, useEffect, useState } from 'react'
import { AuthScreen, AlertModal, LayoutLoader } from 'webstudio/components'
import { Plus } from 'lucide-react'
import { Button } from '@mui/material'
import { useAddresses } from 'webstudio/hooks/shopify'
import { AddressList } from 'webstudio/components/shopify'
import { AppContext } from 'webstudio/context'
import { useRouter } from 'next/router'
import { getShopifyIdFromGid } from 'webstudio/api/shopify/utils'

type AddressesProps = {
	logo: string
	title?: string
	subtitle?: string
}

const Addresses: React.FC<AddressesProps> = (props) => {
	const router = useRouter()

	const [activeAddress, setActiveAddress] = useState(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	const { clientUrl } = useContext(AppContext)

	const {
		logo,
		title = 'Customer Addresses',
		subtitle = 'Manage your addresses',
	} = props || {}

	const { loading, addresses, deleteCustomerAddress, fetchCustomerAddresses } =
		useAddresses()

	const handleClick = (addressGid) => {
		let addressId = getShopifyIdFromGid(addressGid)
		router.push(`${clientUrl}/shopify/addresses/${addressId}`)
	}

	const handleAddAddress = () => {
		router.push(`${clientUrl}/shopify/addresses/new`)
	}

	const handleEdit = (addressGid) => {
		let addressId = getShopifyIdFromGid(addressGid)
		router.push(`${clientUrl}/shopify/addresses/${addressId}`)
	}

	const handleDeleteClick = (address) => {
		setActiveAddress(address)
		setShowDeleteModal(true)
	}

	const handleDelete = async () => {
		await deleteCustomerAddress(activeAddress?.id)
		setShowDeleteModal(false)
	}

	useEffect(() => {
		if (!addresses) {
			fetchCustomerAddresses()
		}
	}, [addresses])

	return (
		<LayoutLoader loading={loading}>
			<AuthScreen logo={logo} title={title} subtitle={subtitle}>
				<AddressList
					addresses={addresses}
					handleClick={handleClick}
					handleEdit={handleEdit}
					handleDelete={handleDeleteClick}
				/>
				<Button
					fullWidth
					variant="outlined"
					onClick={handleAddAddress}
					startIcon={<Plus />}
				>
					Add Address
				</Button>
				<AlertModal
					open={showDeleteModal}
					handleClose={() => setShowDeleteModal(false)}
					handleConfirm={handleDelete}
				/>
			</AuthScreen>
		</LayoutLoader>
	)
}

export default Addresses
