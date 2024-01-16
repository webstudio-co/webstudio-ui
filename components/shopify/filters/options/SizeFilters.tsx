import React, { useState, useEffect } from 'react'
import { CheckboxFilterList } from 'webstudio/components/shopify'
import { ProductCollectionFilter } from '@webstudio/shopify/types'
import { findSizeFilters } from '@webstudio/shopify/helpers'

type SizeFiltersProps = {
	filters: ProductCollectionFilter[]
	options: string[]
	handleClick: (value: string) => void
}

const SizeFilters: React.FC<SizeFiltersProps> = (props) => {
	const { filters, options, handleClick } = props

	const [values, setValues] = useState([])

	useEffect(() => {
		if (filters) {
			setValues(findSizeFilters(filters))
		}
	}, [filters])

	return (
		<CheckboxFilterList
			options={options}
			values={values}
			handleClick={handleClick}
		/>
	)
}

export default SizeFilters
