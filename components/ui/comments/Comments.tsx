import React, { useState, useContext, useEffect } from 'react'
import {
	AlertModal,
	CommentButton,
	Comment,
	CommentModal,
	LoadMore,
	Placeholder,
} from 'webstudio/components'
import { List, Stack, Typography } from '@mui/material'
import { useComments, useAuth } from 'webstudio/hooks'
import { useRouter } from 'next/router'
import { AppContext } from 'webstudio/context'

type CommentsProps = {
	handle: string
	url: string
}

const Comments: React.FC<CommentsProps> = (props) => {
	const { url, handle } = props
	const { currentUser } = useAuth()

	const [activeComment, setActiveComment] = useState(null)

	const [openComment, setOpenComment] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [reply, setReply] = useState(false)

	const {
		loading,
		errors,
		query,
		comment,
		comments,
		setComment,
		findComments,
		handleChange,
		createComment,
		deleteComment,
		totalCount,
		page,
		numPages,
		loadMore,
	} = useComments({
		url,
		handle,
	})

	const { setAuthOpen } = useContext(AppContext)

	const handleToggleClick = () => {
		if (currentUser?.id) {
			setComment({})
			setReply(!reply)
			setOpenComment(!openComment)
		} else {
			setAuthOpen(true)
		}
	}

	const handleReply = (replyComment) => {
		setReply(true)
		setOpenComment(true)
		setComment({
			...comment,
			body: `@${replyComment.user.username}`,
			parent_id: replyComment.id,
		})
	}

	const handleSubmit = async () => {
		await createComment(comment)
		setOpenComment(false)
		findComments({
			...query,
			page: 1,
		})
		setReply(false)
	}

	const handleDeleteComment = (comment) => {
		setActiveComment(comment)
		setOpenDelete(true)
	}

	const handleDelete = async () => {
		await deleteComment(activeComment?.id)
		setOpenDelete(false)
		findComments({
			...query,
			page: 1,
		})
	}

	useEffect(() => {
		if (url && handle) {
			findComments({
				per_page: 5,
			})
		}
	}, [url, handle])

	return (
		<Stack spacing={1} sx={sx.root}>
			<Stack direction="row" sx={sx.commentHeader}>
				<Typography color="text.primary" variant="h6">
					Comments ({totalCount})
				</Typography>
				<CommentButton handleClick={handleToggleClick} />
			</Stack>
			<List disablePadding>
				{comments?.map((comment, i) => (
					<Comment
						key={i}
						comment={comment}
						handleReply={handleReply}
						handleDelete={handleDeleteComment}
					/>
				))}
			</List>
			{!loading && comments?.length == 0 && (
				<Placeholder title="Be the first to comment" />
			)}
			<LoadMore loadMore={loadMore} page={page} numPages={numPages} />
			<AlertModal
				loading={loading}
				open={openDelete}
				handleClose={() => setOpenDelete(false)}
				handleConfirm={handleDelete}
			/>
			<CommentModal
				open={openComment}
				handleClose={() => setOpenComment(false)}
				error={errors}
				loading={loading}
				comment={comment}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</Stack>
	)
}

export default Comments

const sx = {
	root: {
		py: 2,
		pb: 1.5,
		borderColor: 'divider',
	},
	commentHeader: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
}
