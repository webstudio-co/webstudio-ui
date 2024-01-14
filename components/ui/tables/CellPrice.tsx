import React from 'react'
import { CellString } from 'webstudio/components/ui'

type CellPriceProps = {
	value?: number
	currency?: string
	digits?: number
}

const CellPrice: React.FC<CellPriceProps> = (props) => {
	const { value, currency = 'USD', digits = 2 } = props
	const price =
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency,
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
		}).format(value) || 0
	if (!value) return null
	return <CellString variant="body2" value={price} />
}

export default CellPrice
