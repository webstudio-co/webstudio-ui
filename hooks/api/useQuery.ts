import React, { useContext } from 'react'
import { useState } from 'react'
import { ApiContext } from 'webstudio/context/core'
import { useRouter } from 'next/router'
import { QueryParams } from 'webstudio/types'

type QueryProps = {
	url: string
	skip?: boolean
}

const useQuery = (props: QueryProps): Record<string, any> => {
	const { url } = props || {}

	const router = useRouter()
	const { api } = useContext(ApiContext)

	const [query, setQuery] = useState<QueryParams>({
		keywords: null,
		page: 1,
		per_page: 20,
		filters: [],
		sort_by: 'id',
		sort_direction: 'desc',
	})

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [data, setData] = useState([])
	const [meta, setMeta] = useState({})
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(20)
	const [numPages, setNumPages] = useState(1)
	const [totalCount, setTotalCount] = useState(0)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findMany = async (query: QueryParams, loadMore: boolean = false) => {
		if (url.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}
		setQuery(query)
		const res = await apiWrapper(() => api.url(url).findMany(query))
		if (res.data) {
			if (!loadMore) {
				setData(res.data)
			} else {
				setData([...data, ...res.data])
			}
			if (res.meta) {
				setMeta(res.meta)
				setPage(res.meta.page)
				setPerPage(res.meta.per_page)
				setNumPages(res.meta.num_pages)
				setTotalCount(res.meta.total_count)
			}
			return res.data
		}
	}

	const loadMore = () => {
		let nextPage = page + 1
		let loadMoreResults = true
		findMany({ ...query, page: nextPage }, loadMoreResults)
	}

	const paginate = (page) => {
		findMany({
			...query,
			page: page,
		})
	}

	const sort = ({ sortBy, sortDirection }) => {
		findMany({
			...query,
			sort_by: sortBy,
			sort_direction: sortDirection,
		})
	}

	const apiWrapper = async (apiMethod: any) => {
		try {
			showLoading()
			setErrors({})
			const res = await apiMethod()
			if (res?.data) {
				setData(res.data)
			}
			return res.data
		} catch (e) {
			handleErrors(e)
		} finally {
			hideLoading()
		}
	}

	const handleErrors = (e) => {
		if (e?.response?.status === 401) {
			router.push('/login')
		}
		if (e?.data?.errors) {
			setErrors(e?.data?.errors)
		}
		if (e?.data?.message) {
			setErrors({
				...errors,
				message: e?.data?.message,
			})
		}
		console.log('handleErrors', e)
	}

	return {
		loading,
		errors,
		data,
		setData,
		fetch,
		query,
		setQuery,
		meta,
		page,
		perPage,
		numPages,
		totalCount,
		sort,
		paginate,
		loadMore,
	}
}

export default useQuery
