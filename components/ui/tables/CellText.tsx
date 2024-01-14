import React from 'react'
import { CellString } from 'webstudio/components/ui'
import { truncate } from 'webstudio/helpers'

type CellTextProps = {
	value?: string
}

const CellText: React.FC<CellTextProps> = (props) => {
	const { value } = props
	return <CellString variant="body2" value={truncate(value, 20)} />
}

export default CellText

const sx = {
	root: {},
}
