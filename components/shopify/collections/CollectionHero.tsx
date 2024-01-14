import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import {
  CoverImage
} from 'webstudio/components'
import { useCollections } from '@webstudio/shopify'
import { TypographyVariants } from 'webstudio/types'

type CollectionHeroProps = {
  handle: string
	editing?: boolean
	textVariant?: TypographyVariants
	height?: number
	width?: number
	objectFit?: 'cover' | 'contain'
	alignItems?: 'flex-start' | 'center' | 'flex-end'
	alt?: string
	handleClick?: () => void
	enableGradient?: boolean
	enableOverlay?: boolean
	opacity?: number
	bgcolor?: string
	href?: string
}

const CollectionHero: React.FC<CollectionHeroProps> = (props) => {
	const {
    handle,
    editing = false,
		textVariant = 'h3',
		handleClick,
		height = 400,
		objectFit = 'cover',
		alt = 'image',
		enableGradient = false,
		enableOverlay = false,
		opacity = 0.5,
		alignItems = 'center',
		bgcolor = '#FFFFFF',    
		href,
	} = props

	const { collection, fetchCollection } = useCollections()

	useEffect(() => {
		if (handle) {
			fetchCollection(handle)
		}
	}, [handle])

	if (!collection) return null
	return (
		<CoverImage 
      editing={editing}
      enableOverlay={enableOverlay}
      enableGradient={enableGradient}
      opacity={opacity}
      bgcolor={bgcolor}
      height={height}
      textVariant={textVariant}
      title={collection?.title}
      description={collection?.description}
      image={collection?.image?.url}
      objectFit={objectFit}
      alt={alt}
      alignItems={alignItems}
      href={href}
      handleClick={handleClick}
    />
	)
}

export default CollectionHero
