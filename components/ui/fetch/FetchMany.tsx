import React, { useEffect } from 'react'
import { useResourceContext } from 'webstudio/hooks'

type FetchManyProps = {
	url: string
	children: any
	defaultQuery: Record<string, any>
}

const FetchMany: React.FC<FetchManyProps> = (props) => {
	const { children, url, defaultQuery = {} } = props

	const { findMany } = useResourceContext({
		url,
	})

	useEffect(() => {
		if (url) {
			findMany(defaultQuery)
		}
	}, [url])

	return children
}

export default FetchMany
