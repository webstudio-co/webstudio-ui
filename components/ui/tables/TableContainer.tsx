import React from 'react'
import Table from '@mui/material/Table'
import { TableContainer as MuiTableContainer } from '@mui/material'

type TableContainerProps = {
	children: React.ReactNode
	styles?: React.CSSProperties
}

const TableContainer: React.FC<TableContainerProps> = (props) => {
	const { children, styles = {} } = props

	return (
		<MuiTableContainer
			sx={{
				...sx.table,
				...styles,
			}}
		>
			<Table stickyHeader>{children}</Table>
		</MuiTableContainer>
	)
}

export default TableContainer

const sx = {
	table: {
		width: {
			sm: '100%',
			xs: 'calc(100vw-40px)',
		},
		bgcolor: 'background.main',
		'&::-webkit-scrollbar': {
			display: 'none',
			msOverflowStyle: 'none', //IE and Edge
			scrollbarWidth: 'none', // Firefox
		},
	},
}
