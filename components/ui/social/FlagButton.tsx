import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { Star, StarOutlined } from '@mui/icons-material'

type FlagButtonProps = {
	loading?: boolean
	flagged?: boolean
	handleClick: (flagged: boolean) => void
}

const FlagButton: React.FC<FlagButtonProps> = (props) => {
	const { loading = false, flagged = false, handleClick } = props
	const [isFlagged, setIsFlagged] = useState(flagged)

	const handleToggleFlag = () => {
		handleClick(!isFlagged)
		setIsFlagged(!isFlagged)
	}

	useEffect(() => {
		if (flagged) {
			setIsFlagged(true)
		} else {
			setIsFlagged(false)
		}
	}, [flagged])

	return (
		<Button
			disabled={loading}
			variant={isFlagged ? 'contained' : 'outlined'}
			onClick={handleToggleFlag}
			startIcon={
				isFlagged ? <Star sx={sx.icon} /> : <StarOutlined sx={sx.icon} />
			}
		>
			{isFlagged ? 'Flagged' : 'Flag'}
		</Button>
	)
}

export default FlagButton

const sx = {
	icon: {
		fontSize: '40px',
	},
}
