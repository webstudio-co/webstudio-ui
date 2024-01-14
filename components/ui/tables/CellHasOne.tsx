import React from 'react'
import { CellButton } from 'webstudio/components/ui'
import { RepeatOne } from '@mui/icons-material'

type CellHasOneProps = {
	value: string
	handleClick: () => void
}

const CellHasOne: React.FC<CellHasOneProps> = (props) => {
	const { value, handleClick } = props

	return (
		<CellButton value={value} handleClick={handleClick} icon={<RepeatOne />} />
	)
}

export default CellHasOne
