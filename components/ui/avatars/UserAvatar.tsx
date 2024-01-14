import React from 'react'
import {
	Avatar,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { User } from 'lucide-react'

type User = {
	name: string
	avatar: {
		url: string
	}
}

type UserAvatarProps = {
	user: User
	label?: string
	handleClick?: () => void
}

const UserAvatar: React.FC<UserAvatarProps> = (props) => {
	const { user, label, handleClick } = props

	return (
		<List>
			<ListItem disableGutters>
				<ListItemButton onClick={handleClick && handleClick}>
					<ListItemIcon>
						<Avatar src={user?.avatar?.url} alt={user?.name} />
					</ListItemIcon>
					<ListItemText primary={user?.name} secondary={label} />
				</ListItemButton>
			</ListItem>
		</List>
	)
}

export default UserAvatar
