import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from 'webstudio/context'
import { useResource } from 'webstudio/hooks'
import { Box, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { StyledList } from 'webstudio/components'
import { getDocumentValue } from 'webstudio/helpers'

type CollectionHasManyProps = {
	layout?: 'list' | 'grid' | 'carousel'
	style?: 'card' | 'avatar' | 'image' | 'cover' | 'chip'
	field: any
	url: string
	handle: string
	navigateUrl?: any
	foreignUrl?: string
	perPage?: number
	query?: any
	editing?: boolean
	buttonText?: string
	autoPlay?: boolean
	arrows?: boolean
	showDots?: boolean
	enableBorder?: boolean
	enableGradient?: boolean
}

const CollectionHasMany: React.FC<CollectionHasManyProps> = (props) => {
	const {
		layout = 'list',
		style = 'card',
		field,
		url,
		foreignUrl,
		navigateUrl,
		handle,
		perPage = 5,
		editing = false,
		buttonText,
		query: defaultQuery = null,
		autoPlay = false,
		arrows = false,
		showDots = true,
		enableBorder = false,
		enableGradient = false,
	} = props

	const router = useRouter()
	const [documents, setDocuments] = useState<any[]>([])

	const { clientUrl } = useContext(AppContext)

	const { resource, findOne } = useResource({
		url,
	})

	const { loading, query, resources, findMany } = useResource({
		url: foreignUrl,
	})

	const handleClick = (item) => {
		if (!editing && clientUrl && navigateUrl && item?.handle) {
			router.push(`${clientUrl}${navigateUrl}/${item?.handle}/show`)
		}
	}

	useEffect(() => {
		if (handle) {
			findOne(handle)
		}
	}, [handle])

	useEffect(() => {
		if (resource && field) {
			setDocuments(getDocumentValue(resource, field))
		}
	}, [resource, field])

	useEffect(() => {
		if (foreignUrl && documents) {
			const documentIds = documents.map((document) => document.id)
			findMany({
				...query,
				...defaultQuery,
				filters: {
					AND: [
						{
							id: {
								in: documentIds,
							},
						},
					],
				},
				per_page: perPage,
				page: 1,
			})
		}
	}, [documents, foreignUrl, defaultQuery])

	return (
		<StyledList
			resources={resources}
			layout={layout}
			style={style}
			editing={editing}
			loading={loading}
			buttonText={buttonText}
			handleClick={handleClick}
			autoPlay={autoPlay}
			arrows={arrows}
			showDots={showDots}
			enableBorder={enableBorder}
			enableGradient={enableGradient}
		/>
	)
}

export default CollectionHasMany

const sx = {
	root: {
		width: '100%',
	},
}
