import { gql } from '@apollo/client'

export const ImageFragment = gql`
	fragment ImageFragment on Image {
		id
		altText
		url
	}
`
