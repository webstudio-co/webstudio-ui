import React from 'react'
import { useAlerts } from 'webstudio/hooks'
import { Modal } from 'webstudio/components'
import { LightDarkProvider } from 'webstudio/context'
import { Box, Button } from '@mui/material'
import { Link, Download } from 'lucide-react'
import copy from 'copy-to-clipboard'

type VideoModalProps = {
	open: boolean
	src: string
	title?: string
	handleClose: () => void
	enableCopy?: boolean
	enableDownload?: boolean
}

const VideoModal: React.FC<VideoModalProps> = (props) => {
	let {
		open,
		src,
		title = '',
		handleClose,
		enableCopy = false,
		enableDownload = false,
	} = props

	const { showAlertSuccess } = useAlerts()

	const handleCopyUrlClick = () => {
		copy(src)
		showAlertSuccess('Asset URL copied to clipboard')
	}

	const handleDownloadClick = () => {
		window.open(src, '_blank')
	}

	//@ts-ignore
	if (!title?.length > 0) {
		title = src?.split('/').pop()
	}

	return (
		<LightDarkProvider bgcolor="#000000">
			<Modal
				fullScreen
				open={open}
				handleClose={handleClose}
				maxWidth="md"
				p={0}
				title={title}
				actions={
					<>
						{enableCopy && (
							<Button
								variant="outlined"
								sx={sx.button}
								startIcon={<Link />}
								onClick={handleCopyUrlClick}
							>
								Copy URL
							</Button>
						)}
						{enableDownload && (
							<Button
								variant="outlined"
								sx={sx.button}
								startIcon={<Download />}
								onClick={handleDownloadClick}
							>
								Download
							</Button>
						)}
					</>
				}
			>
				<Box sx={sx.root}>
					<video src={src} controls muted autoPlay />
				</Box>
			</Modal>
		</LightDarkProvider>
	)
}

export default VideoModal

const sx = {
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		color: 'text.secondary',
	},
}
