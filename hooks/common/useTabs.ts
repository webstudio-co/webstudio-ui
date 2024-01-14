import React, { useContext, useEffect } from 'react'
import { LayoutContext } from 'context'

const useTabs = (tab: string) => {
	const { activeTab, setActiveTab } = useContext(LayoutContext)

	useEffect(() => {
		if (tab) {
			setActiveTab(tab)
		}
	}, [tab])

	return {
		activeTab,
		setActiveTab,
	}
}

export default useTabs
