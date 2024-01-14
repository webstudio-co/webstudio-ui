import React, { useEffect, useContext } from 'react'
import { AppContext } from 'webstudio/context'
import { useAuth, useResource } from 'webstudio/hooks'
import { useRouter } from 'next/router'
import { StyledList } from 'webstudio/components'

type FavoritesProps = {
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
	enableBorder?: boolean
	enableGradient?: boolean
  enableOverlay?: boolean
}

const Favorites: React.FC<FavoritesProps> = (props) => {
	const { currentUser } = useAuth()

	const {
		layout = 'list',
		style = 'card',
		url,
		navigateUrl,
		perPage = 5,
		editing = false,
		buttonText,
		query: defaultQuery = null,
		enableBorder = false,
		enableGradient = false,
    enableOverlay = false,
	} = props

	const router = useRouter()

	const { clientUrl } = useContext(AppContext)

	const { loading, query, resources, findMany } = useResource({
		url,
	})

	const handleClick = (item) => {
		if (!editing && clientUrl && navigateUrl && item?.handle) {
			router.push(`${clientUrl}${navigateUrl}/${item?.handle}/show`)
		}
	}

	useEffect(() => {
		if (url && currentUser) {
			const documentIds = currentUser?.favorites?.map((document) => document.id)

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
	}, [currentUser, url, defaultQuery])

	return (
		<StyledList
			resources={resources}
			layout={layout}
			style={style}
			editing={editing}
			loading={loading}
			buttonText={buttonText}
			handleClick={handleClick}
			enableBorder={enableBorder}
			enableGradient={enableGradient}
      enableOverlay={enableOverlay}
			emptyTitle="No favorites found"
			emptyDescription="Try adding some favorites"
			emptyIcon="Bookmark"
		/>
	)
}

export default Favorites
