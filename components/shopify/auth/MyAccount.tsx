import React, { useContext } from 'react'
import {
	Avatar,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import { AuthScreen, Placeholder } from 'webstudio/components'
import { useAuth } from '@webstudio/shopify'
import { useRouter } from 'next/router'
import { User, ShoppingCart, MapPin, LogOut } from 'lucide-react'
import { AppContext } from 'webstudio/context'

type MenuItemProps = {
	item: {
		label: string
		path: string
		icon?: React.ReactElement
	}
	handleClick: (path: string) => void
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { item, handleClick } = props || {}
	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => handleClick(item?.path)}>
				<ListItemIcon>{item.icon}</ListItemIcon>
				<ListItemText primary={item.label} />
			</ListItemButton>
		</ListItem>
	)
}

type MyAccountProps = {
	logo: string
	title?: string
	subtitle?: string
	loginUrl?: string
}

const MENU_ITEMS = [
	{
		label: 'Account Details',
		path: '/shopify/customer',
		icon: <User />,
	},
	{
		label: 'Addresses',
		path: '/shopify/addresses',
		icon: <MapPin />,
	},
	{
		label: 'Order History',
		path: '/shopify/orders',
		icon: <ShoppingCart />,
	},
	{
		label: 'Sign Out',
		path: '/logout',
		icon: <LogOut />,
	},
]

const MyAccount: React.FC<MyAccountProps> = (props) => {
	const {
		logo,
		loginUrl,
		title = 'My Account',
		subtitle = 'Manage your account',
	} = props || {}

	const router = useRouter()
	const { clientUrl } = useContext(AppContext)

	const { customer } = useAuth()

	const handleLogin = () => {
		router.push(loginUrl)
	}

	const handleClick = (path: string) => {
		router.push(`${clientUrl}${path}`)
	}

	return (
		<AuthScreen logo={logo} title={title} subtitle={subtitle}>
			{customer ? (
				<List disablePadding>
					{MENU_ITEMS.map((item, i) => (
						<MenuItem key={i} item={item} handleClick={handleClick} />
					))}
				</List>
			) : (
				<Placeholder
					title="Please sign in."
					description="You must be signed in to manage your account."
					actions={<Button onClick={handleLogin}>Sign In</Button>}
				/>
			)}
		</AuthScreen>
	)
}

export default MyAccount
