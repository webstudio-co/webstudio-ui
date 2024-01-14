import React, { useState } from 'react'
import {
	Box,
	Button,
	Collapse,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Typography,
} from '@mui/material'
import { Avatar, MenuButton } from 'webstudio/components'
import { useAuth } from 'webstudio/hooks'
import moment from 'moment'

type CommentProps = {
	comment: any
	reply?: boolean
	user?: any
	level?: number
	enableReply?: boolean
	handleDelete?: (comment: any) => void
	handleReply?: (comment: any) => void
}

const Comment: React.FC<CommentProps> = (props) => {
	const { currentUser } = useAuth()

	const { comment, level = 0, handleReply, handleDelete } = props

	const [showReplies, setShowReplies] = useState(false)

	const handleShowReplies = () => {
		setShowReplies(!showReplies)
	}

	return (
		<>
			<ListItem
				sx={{
					...sx.listItem,
					pl: Math.min(level * 7, 14),
				}}
				secondaryAction={
					<Box sx={sx.menuItems} className="menu-items">
						{currentUser && (
							<MenuButton>
								<MenuItem onClick={() => handleReply(comment)}>Reply</MenuItem>
								{currentUser?.role == 'admin' && (
									<MenuItem onClick={() => handleDelete(comment)}>
										Delete
									</MenuItem>
								)}
							</MenuButton>
						)}
					</Box>
				}
			>
				<ListItemButton
					sx={sx.listItemButton}
					onClick={() => handleReply(comment)}
				>
					<ListItemIcon sx={sx.listItemIcon}>
						<Avatar user={comment?.user} />
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant="body1" sx={sx.comment}>
								{comment?.body}
							</Typography>
						}
						secondary={
							<Typography variant="body2" color="textSecondary">
								{comment?.user?.username} commented on{' '}
								{moment(comment?.created_at).format('MM/DD/YY')}
							</Typography>
						}
					/>
				</ListItemButton>
			</ListItem>
			{comment?.replies?.length > 0 && (
				<>
					{!showReplies && (
						<Box
							sx={{
								pl: Math.min(level * 7, 14),
							}}
						>
							<Button onClick={handleShowReplies}>
								Show {comment?.replies?.length} replies
							</Button>
						</Box>
					)}
					<Collapse in={showReplies}>
						{comment?.replies?.map((reply) => (
							<Comment
								key={reply.id}
								comment={reply}
								level={level + 1}
								handleReply={handleReply}
								handleDelete={handleDelete}
							/>
						))}
					</Collapse>
				</>
			)}
		</>
	)
}

export default Comment

const sx = {
	root: {},
	reply: {
		pl: 7,
	},
	showRepliesButton: {
		pl: 7,
	},
	menuItems: {
		display: 'none',
	},
	listItem: {
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
		alignItems: 'flex-start',
		'&:hover .MuiBox-root': {
			display: 'block',
		},
	},
	listItemButton: {
		py: 0,
		borderRadius: (theme) => `${theme.shape.borderRadius}px`,
	},
	listItemIcon: {
		mt: 1,
	},
	comment: {
		color: 'text.primary',
		whiteSpace: 'pre-wrap',
	},
	content: {
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}
