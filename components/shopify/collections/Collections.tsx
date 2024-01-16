import React, { useEffect, useContext } from 'react'
import { useCollections } from '@webstudio/shopify/hooks'
import { StyledList } from 'webstudio/components'
import { Stack, useTheme, Typography } from '@mui/material'
import { ShopContext } from 'webstudio/context'
import { useRouter } from 'next/router'

type CollectionProps = {
	title?: string
	editing?: boolean
	children: React.ReactNode
	layout?: 'grid' | 'list' | 'carousel'
	style?: 'card' | 'list' | 'avatar' | 'cover'
	perPage?: number
	buttonText?: string
	autoPlay?: boolean
	arrows?: boolean
	showDots?: boolean
	enableBorder?: boolean
	enableGradient?: boolean
}

const Collections: React.FC<CollectionProps> = (props) => {
	const {
		title,
		editing = false,
		perPage = 20,
		layout = 'grid',
		style = 'card',
		buttonText,
		enableBorder = false,
		enableGradient = false,
	} = props

	const router = useRouter()
	const theme = useTheme()

	const { loading, collections, fetchCollections } = useCollections()

	const { shopUrl } = useContext(ShopContext)

	const handleClick = (collection) => {
		if (!editing && shopUrl) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
			router.push(`${shopUrl}/collections/${collection?.handle}`)
		}
	}

	useEffect(() => {
		fetchCollections()
	}, [])

	return (
		<Stack spacing={1} sx={sx.root}>
			<Typography variant="h6" color="textPrimary">
				{title}
			</Typography>
			<StyledList
				layout={layout}
				//@ts-ignore
				style={style}
				resources={collections}
				editing={editing}
				loading={loading}
				items={collections}
				buttonText={buttonText}
				handleClick={handleClick}
				enableBorder={enableBorder}
				enableGradient={enableGradient}
			/>
		</Stack>
	)
}

export default Collections

const sx = {
	root: {
		width: '100%',
	},
}
