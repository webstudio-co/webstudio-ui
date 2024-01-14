import { gql } from '@apollo/client'
import { ProductFragment } from './products'

export const QUERY_SEARCH = gql`
	query Search($query: String!, $after: String) {
		search(
			first: 48
			after: $after
			query: $query
			reverse: false
			sortKey: RELEVANCE
		) {
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					...ProductFragment
				}
			}
		}
	}
	${ProductFragment}
`
