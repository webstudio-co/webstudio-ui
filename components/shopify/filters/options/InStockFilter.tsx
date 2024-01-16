import React, { useState, useEffect } from 'react'
import { CheckboxFilterList } from 'webstudio/components/shopify'
import { ProductCollectionFilter } from '@webstudio/shopify/types'
import { findAvailableFilter } from '@webstudio/shopify/helpers'

type InStockFilterProps = {
	filters: ProductCollectionFilter[]
	handleClick: (value: string) => void
}

const InStockFilter: React.FC<InStockFilterProps> = (props) => {
	const { filters, handleClick } = props

	const [values, setValues] = useState([])

	useEffect(() => {
		if (filters) {
			setValues([findAvailableFilter(filters)])
		}
	}, [filters])

	return (
		<CheckboxFilterList
			options={[{ label: 'In-stock', value: true }]}
			values={values}
			handleClick={handleClick}
		/>
	)
}

export default InStockFilter
