import React from 'react'
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Stack,
} from '@mui/material'
import { Image } from 'webstudio/components'
import { formatCurrency } from '@webstudio/shopify/helpers'
import moment from 'moment'
import { Order } from 'api/shopify/types'

type OrderItemProps = {
	order: Order
	handleClick: any
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
	const { order, handleClick } = props

	return (
		<ListItem>
			<ListItemButton onClick={() => handleClick(order)}>
				<ListItemIcon sx={sx.image}>
					<Image
						alt={order?.name}
						src={order?.lineItems?.edges[0]?.node?.variant?.image?.url}
						width={64}
						height={64}
					/>
				</ListItemIcon>
				<ListItemText
					primary={
						<Typography gutterBottom variant="subtitle1" component="h2">
							Order {order?.name}
						</Typography>
					}
					secondary={
						<Stack spacing={0}>
							<Typography variant="body2" color="textSecondary">
								{moment(order?.processedAt).format('MM/DD/YYYY')}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{formatCurrency(order?.totalPrice?.amount)}
							</Typography>
						</Stack>
					}
				/>
			</ListItemButton>
		</ListItem>
	)
}

export default OrderItem

const sx = {
	image: {
		mr: 2,
	},
}
