import React from 'react'
import { Box, Button, useTheme } from '@mui/material'
import { ButtonLoader, Placeholder, Modal } from 'webstudio/components/ui'
import { AlertCircle } from 'lucide-react'

type AlertModalProps = {
	loading?: boolean
	title?: string
	description?: string
	open: boolean
	handleClose: () => void
	handleConfirm: any
}

const AlertModal: React.FC<AlertModalProps> = (props) => {
	const {
		loading = false,
		title = 'Please confirm or cancel this action.',
		description = 'This action is not reversable.',
		open,
		handleClose,
		handleConfirm,
	} = props

	const theme = useTheme()

	return (
		<Modal
			open={open}
			loading={loading}
			title="Are you sure?"
			actions={
				<Button
					variant="contained"
					color="secondary"
					onClick={handleConfirm}
					startIcon={<ButtonLoader loading={loading} />}
				>
					Confirm
				</Button>
			}
			handleClose={handleClose}
		>
			{!loading && (
				<Placeholder
					icon={<AlertCircle color={theme?.palette?.icon} />}
					title={title}
					description={description}
				/>
			)}
		</Modal>
	)
}

export default AlertModal

const sx = {
	content: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		color: 'icon',
		height: 32,
		width: 32,
	},
}
