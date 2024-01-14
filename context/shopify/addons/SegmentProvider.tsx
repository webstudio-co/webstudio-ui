import React, { useState, useEffect } from 'react'
import SegmentContext from './SegmentContext'
import { AnalyticsBrowser } from '@segment/analytics-next'

type SegmentProviderProps = {
	children: React.ReactNode
	writeKey: string
}

export const SegmentProvider = (props: SegmentProviderProps) => {
	const { children, writeKey } = props

	const [segment, setSegment] = useState()

	useEffect(() => {
		if (writeKey) {
			//@ts-ignore
			setSegment(AnalyticsBrowser.load({ writeKey }))
		}
	}, [writeKey])

	let value = {
		segment,
	}

	return (
		<SegmentContext.Provider value={value}>{children}</SegmentContext.Provider>
	)
}

export default SegmentProvider
