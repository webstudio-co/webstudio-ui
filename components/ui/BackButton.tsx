import React, { useContext } from 'react'
import { LayoutContext } from 'context'
import { Box, IconButton, Hidden } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'

const BackButton: React.FC = (props) => {
	const { setOpenMobile } = useContext(LayoutContext)
	const onClick = () => setOpenMobile(false)

	return (
		<Hidden smUp>
			<Box sx={sx.goBack}>
				<IconButton onClick={onClick} sx={sx.backButton}>
					<ChevronLeft />
				</IconButton>
			</Box>
		</Hidden>
	)
}

export default BackButton

const sx = {
	goBack: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	backButton: {
		color: 'icon',
	},
}
