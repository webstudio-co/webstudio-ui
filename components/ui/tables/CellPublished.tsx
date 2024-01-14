import React from 'react'
import { PublishedLabel } from 'components'

type CellPublishedProps = {
	value: boolean
}

const CellPublished: React.FC<CellPublishedProps> = (props) => {
	const { value } = props
	return <PublishedLabel published={value} />
}

export default CellPublished
