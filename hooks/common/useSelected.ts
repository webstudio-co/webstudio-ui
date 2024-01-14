import React, { useState, useEffect } from 'react'

const useSelected = () => {
	const [selected, setSelected] = useState([])
	const [selectedIds, setSelectedIds] = useState([])

	const handleSelect = (item) => {
		if (selectedIds.find((id) => id === item.id)) {
			setSelected(selected.filter((i) => i.id != item.id))
		} else {
			setSelected(selected.concat(item))
		}
	}

	const handleClear = () => {
		setSelected([])
	}

	useEffect(() => {
		if (selected) {
			setSelectedIds(selected.map((item) => item.id))
		}
	}, [selected])

	return {
		selected,
		selectedIds,
		setSelected,
		setSelectedIds,
		handleSelect,
		handleClear,
	}
}

export default useSelected
