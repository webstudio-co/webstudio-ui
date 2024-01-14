import React from 'react'
import { Popup } from 'webstudio/components'
import FilterForm from './FilterForm'

type FilterPopupProps = {
	open: boolean
	anchorEl: any
	query: any
	handleClose: () => void
	fields: any[]
	handleSearch: (keywords: any) => void
	handleChange: (e: any) => void
	handleClearFilters: () => void
}

const FilterPopup: React.FC<FilterPopupProps> = (props) => {
	const {
		open,
		anchorEl,
		query,
		handleClose,
		fields,
		handleSearch,
		handleChange,
		handleClearFilters,
	} = props

	return (
		<Popup
			anchorEl={anchorEl}
			open={open}
			handleClose={handleClose}
			title="search"
		>
			<FilterForm
				query={query}
				fields={fields}
				handleSearch={handleSearch}
				handleChange={handleChange}
				handleClearFilters={handleClearFilters}
			/>
		</Popup>
	)
}

export default FilterPopup
