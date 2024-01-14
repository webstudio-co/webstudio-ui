import React from 'react'
import { Box, Stack, Button } from '@mui/material'
import { Avatar, IconLoader, TextInput } from 'webstudio/components'
import { useAuth } from 'webstudio/hooks'

type CommentFormProps = {
	loading?: boolean
	errors?: any
	comment: any
	handleChange: (ev: any) => void
	handleSubmit: () => void
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
	const { currentUser } = useAuth()

	const { loading, errors, comment, handleChange, handleSubmit } = props

	return (
		<Stack sx={sx.root} direction="row" spacing={1}>
			<Box mt={0.5}>
				<Avatar user={currentUser} size={32} />
			</Box>
			<TextInput
				errors={errors}
				multiline
				name="body"
				value={comment?.body}
				handleChange={handleChange}
				placeholder="Leave a comment..."
			/>
			<Box pt={0.5}>
				<Button
					variant="contained"
					onClick={handleSubmit}
					disabled={loading}
					startIcon={<IconLoader loading={loading} />}
				>
					Submit
				</Button>
			</Box>
		</Stack>
	)
}

export default CommentForm

const sx = {
	root: {
		alignItems: 'flex-start',
	},
}
