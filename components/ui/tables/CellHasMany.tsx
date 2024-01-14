import React from 'react'
import { CellButton } from 'webstudio/components/ui'
import { ForkRight } from '@mui/icons-material'

type CellHasManyProps = {
	value: any
	handleClick: () => void
}

const CellHasMany: React.FC<CellHasManyProps> = (props) => {
	const { value, handleClick } = props
	return (
		<CellButton value={value} handleClick={handleClick} icon={<ForkRight />} />
	)
}

export default CellHasMany
