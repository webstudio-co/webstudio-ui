import React, { useContext } from 'react'
import { Button, IconButton } from '@mui/material'
import { ShopContext } from 'webstudio/context/shopify'
import { AppContext } from 'webstudio/context'
import { Icon } from 'webstudio/components'

type SearchButtonProps = {
	editing?: boolean
	showIcon?: boolean
	showLabel?: boolean
}

const SearchButton: React.FC<SearchButtonProps> = (props) => {
	const { showLabel = false, showIcon = true, editing = false } = props
	const { toggleSearch } = useContext(ShopContext)
  const { setMenuOpen  } = useContext(AppContext)

	const handleToggleSearch = () => {
		if (!editing) {
      setMenuOpen(false)
			toggleSearch()
		}
	}

	return (
		<>
			{!showLabel && (
				<IconButton sx={sx.root} onClick={handleToggleSearch}>
					<Icon name="Search" size={24} />
				</IconButton>
			)}
			{showLabel && (
				<Button
					fullWidth
					sx={sx.button}
					onClick={handleToggleSearch}
					startIcon={showIcon && <Icon name="Search" size={24} />}
				>
					Search
				</Button>
			)}
		</>
	)
}

export default SearchButton

const sx = {
	root: {
		px: 1,
	},
	button: {
		color: 'text.primary',
		justifyContent: 'flex-start',
	},
}
