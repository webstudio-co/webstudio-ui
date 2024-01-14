import React, { useState } from 'react'
import {
	Autocomplete,
	Button,
	Popper,
	IconButton,
	InputBase,
	Box,
	Typography,
} from '@mui/material'
import { Close, Done, LocalOfferOutlined } from '@mui/icons-material'

type AutoselectProps = {
	label: string
	title: string
	value: any
	startIcon: any
	endIcon: any
	options: {
		label: string
		value: any
	}[]
	handleChange: any
	variant?: 'button' | 'icon'
}

const Autoselect: React.FC<AutoselectProps> = (props) => {
	const {
		label,
		value,
		startIcon,
		endIcon,
		options,
		handleChange,
		variant = 'button',
	} = props

	const [anchorEl, setAnchorEl] = useState(null)
	const [pendingValue, setPendingValue] = useState([])

	const handleClick = (event) => {
		setPendingValue(value)
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (event, reason) => {
		if (reason === 'toggleInput') {
			return
		}
		handleChange(pendingValue)
		if (anchorEl) {
			anchorEl.focus()
		}
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'label' : undefined

	return (
		<React.Fragment>
			<Box sx={sx.root}>
				{variant == 'button' && (
					<Button
						disableRipple
						onClick={handleClick}
						startIcon={startIcon && startIcon}
						endIcon={endIcon && endIcon}
					>
						{label}
					</Button>
				)}
				{variant == 'icon' && (
					<IconButton edge="start" disableRipple onClick={handleClick}>
						<LocalOfferOutlined />
					</IconButton>
				)}
			</Box>
			<Popper
				id={id}
				open={open}
				anchorEl={anchorEl}
				placement="bottom-start"
				sx={sx.popper}
			>
				<Autocomplete
					open
					onClose={handleClose}
					multiple
					sx={{
						paper: sx.paper,
						option: sx.option,
						popperDisablePortal: sx.popperDisablePortal,
					}}
					value={pendingValue}
					onChange={(event, newValue) => {
						setPendingValue(newValue)
					}}
					disableCloseOnSelect
					disablePortal
					renderTags={() => null}
					noOptionsText="No options"
					renderOption={(option, { selected }) => (
						<>
							<Done
								sx={{
									...sx.iconSelected,
									...(selected && sx.visible),
								}}
							/>
							<Typography sx={sx.text}>{option}</Typography>
							<Close
								sx={{
									...sx.iconSelected,
									...(selected && sx.visible),
								}}
							/>
						</>
					)}
					options={[...options].sort((a, b) => {
						// Display the selected options first.
						let ai = value.indexOf(a)
						ai = ai === -1 ? value.length + options.indexOf(a) : ai
						let bi = value.indexOf(b)
						bi = bi === -1 ? value.length + options.indexOf(b) : bi
						return ai - bi
					})}
					getOptionLabel={(option) => option}
					renderInput={(params) => (
						<InputBase
							ref={params.InputProps.ref}
							inputProps={params.inputProps}
							autoFocus
							sx={sx.inputBase}
						/>
					)}
				/>
			</Popper>
		</React.Fragment>
	)
}

export default Autoselect

const sx = {
	root: {},
	badge: {
		marginRight: 1,
	},
	tag: {
		marginTop: 3,
		height: 20,
		padding: '.15em 4px',
		fontWeight: 600,
		lineHeight: '15px',
		borderRadius: 2,
	},
	count: {
		marginLeft: 0.5,
	},
	icon: {
		color: 'primary.main',
	},
	popper: {
		border: '1px solid rgba(27,31,35,.15)',
		boxShadow: '0 3px 12px rgba(27,31,35,.15)',
		borderRadius: 3,
		width: 300,
		zIndex: 1,
		fontSize: 15,
		color: '#586069',
		backgroundColor: '#f6f8fa',
	},
	header: {
		borderBottom: '1px solid #e1e4e8',
		padding: '8px 10px',
		fontWeight: 600,
	},
	iconSelected: {
		height: 20,
		width: 20,
		visibility: 'hidden',
	},
	inputBase: {
		padding: 10,
		width: '100%',
		borderBottom: '1px solid #dfe2e5',
		'& input': {
			borderRadius: 4,
			backgroundColor: 'common.white',
			padding: 8,
			transition: (theme) =>
				theme.transitions.create(['border-color', 'box-shadow']),
			border: '1px solid #ced4da',
			fontSize: 15,
			'&:focus': {
				boxShadow: '0 0 10px 0 rgb(0,0,0,.1)',
				borderColor: 'primary.light',
			},
		},
	},
	paper: {
		boxShadow: 'none',
		margin: 0,
		color: '#586069',
		fontSize: 15,
	},
	option: {
		minHeight: 'auto',
		alignItems: 'flex-start',
		padding: 8,
		'&[aria-selected="true"]': {
			backgroundColor: 'transparent',
		},
		'&[data-focus="true"]': {
			backgroundColor: 'action.hover',
		},
	},
	popperDisablePortal: {
		position: 'relative',
	},
	text: {
		flexGrow: 1,
	},
	close: {
		opacity: 0.6,
		width: 18,
		height: 18,
	},
	visible: {
		visibility: true,
	},
}
