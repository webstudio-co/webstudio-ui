import React from 'react'
import { useResource } from 'webstudio/hooks'

type UseCommentsProps = {
	url: string
	handle: string
}

const useComments = (props: UseCommentsProps) => {
	const { url, handle } = props

	const {
		loading,
		loaded,
		errors,
		empty,
		resource: comment,
		resources: comments,
		findOne: findComment,
		findMany: findComments,
		update: updateComment,
		create: createComment,
		destroy: deleteComment,
		setResource: setComment,
		handleChange,
		handleChangePage,
		reloadMany: reloadComments,
		query,
		setQuery,
		page,
		numPages,
		perPage,
		totalCount,
		sortBy,
		sortDirection,
		handleSort,
		loadMore,
		loadingWrapper,
		paginate,
	} = useResource({
		url: `${url}/${handle}/comments`,
		name: 'comment',
	})

	return {
		loading,
		errors,
		loaded,
		empty,
		comment,
		comments,
		findComment,
		findComments,
		createComment,
		updateComment,
		deleteComment,
		handleChange,
		handleChangePage,
		reloadComments,
		setComment,
		query,
		setQuery,
		paginate,
		page,
		numPages,
		perPage,
		totalCount,
		sortBy,
		sortDirection,
		handleSort,
		loadMore,
		loadingWrapper,
	}
}

export default useComments
