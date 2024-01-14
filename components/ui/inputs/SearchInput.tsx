import React, { useState, useEffect } from 'react'
import { Box, Typography, InputBase } from '@mui/material'
import { sx as inputSx } from 'webstudio/components/ui/inputs/styles'
import { useDebounce } from 'use-debounce'
import { SyntheticEvent } from 'webstudio/types'

type SearchInputProps = {
	name?: string
	label?: string
	value?: string
	placeholder?: string
	handleChange?: (e: SyntheticEvent) => void
	handleSearch?: (keywords: string) => void
	styles?: any
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
	const {
		name = 'keywords',
		label,
		value,
		placeholder = 'Search...',
		handleChange,
		handleSearch,
		styles = {},
	} = props

	const [text, setText] = useState(value)
	const [debouncedValue] = useDebounce(text, 500)

	const handleInputChange = (e) => {
		setText(e.target.value)
	}

	useEffect(() => {
		if (debouncedValue !== value) {
			handleChange({
				target: {
					name,
					value: debouncedValue,
				},
			})
		}
	}, [debouncedValue])

	useEffect(() => {
		if (value !== text) {
			setText(value)
		}
	}, [value])

	return (
		<Box sx={sx.root}>
			{label && (
				<Typography variant="body2" color="textSecondary">
					{label}
				</Typography>
			)}
			<InputBase
				sx={{
					...sx.inputBase,
					...inputSx.inputBase,
					...styles,
				}}
				type="text"
				fullWidth
				name={name}
				placeholder={placeholder}
				autoComplete="off"
				onChange={handleInputChange}
				value={text}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						handleSearch(text)
					}
				}}
			/>
		</Box>
	)
}

export default SearchInput

const sx = {
	root: {
		width: '100%',
	},
	inputBase: {
		minWidth: '165px',
	},
}
