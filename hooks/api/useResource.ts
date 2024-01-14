import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ApiContext } from 'webstudio/context/core'
import { useRouter } from 'next/router'
import { QueryParams, QueryProps, Resource, PageInfo } from 'webstudio/types'

type UseResourceProps = {
	url?: string
	name?: string
}

const useResource = (props: UseResourceProps): Record<string, any> => {
	const { url, name = 'resource' } = props || {}

	const router = useRouter()
	const { api } = useContext(ApiContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()

	const [resource, setResource] = useState<Resource>({})
	const [resources, setResources] = useState<Resource[]>([])

	const [query, setQuery] = useState<QueryParams>({})
	const [meta, setMeta] = useState<PageInfo>(null)
	const [page, setPage] = useState<number>(1)
	const [perPage, setPerPage] = useState<number>(10)
	const [totalCount, setTotalCount] = useState<number>(0)
	const [numPages, setNumPages] = useState<number>(0)

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findOne = async (id: number) => {
		if (!id) return null
		return await loadingWrapper(() => api.collection(name).url(url).findOne(id))
	}

	const findMany = async (
		queryParams: QueryParams,
		loadMore: boolean = false
	) => {
		if (url.includes('undefined')) {
			console.log('Error: the URL contains undefined', url)
			return
		}
		try {
			setLoading(true)
			if (queryParams) {
				setQuery({
					...query,
					...queryParams,
				})
			}
			const res = await api.url(url).findMany({
				...query,
				...queryParams,
			})
			if (res.data) {
				if (!loadMore) {
					setResources(res.data)
				} else {
					setResources([...resources, ...res.data])
				}
				if (res.meta) {
					setMeta(res.meta)
					setPage(res.meta.page)
					setPerPage(res.meta.per_page)
					setTotalCount(res.meta.total_count)
					setNumPages(res.meta.num_pages)
				}
				return res.data
			}
		} catch (e) {
			handleErrors(e)
		} finally {
			setLoading(false)
		}
	}

	const loadMore = () => {
		let nextPage = page + 1
		let loadMoreResults = true
		findMany({ ...query, page: nextPage }, loadMoreResults)
	}

	const reloadMany = () => {
		findMany(query)
	}

	const paginate = (page: number) => {
		findMany({
			...query,
			page: page,
		})
	}

	const sort = (sortBy: string, sortDirection: 'asc' | 'desc') => {
		findMany({
			...query,
			sort_by: sortBy,
			sort_direction: sortDirection,
		})
	}

	const save = (data: Resource) => {
		if (data?.id) {
			return update(data)
		} else {
			return create(data)
		}
	}

	const create = async (data: Resource) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).create(data)
		)
	}

	const update = async (data: Resource) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).update(data)
		)
	}

	const destroy = async (id: Resource) => {
		return await loadingWrapper(() => api.collection(name).url(url).destroy(id))
	}

	const updateMany = async (ids: number[], data: Resource) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).updateMany(ids, data)
		)
	}

	const deleteMany = async (ids: number[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).destroyMany(ids)
		)
	}

	const publish = async (ids: number[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).publish(ids)
		)
	}

	const unpublish = async (ids: number[]) => {
		return await loadingWrapper(() =>
			api.collection(name).url(url).unpublish(ids)
		)
	}

	const addLinks = async (
		id: number,
		contentType: string,
		dataIds: number[]
	) => {
		return await loadingWrapper(() =>
			api.collection('links').url(url).addLinks(id, contentType, dataIds)
		)
	}

	const removeLinks = async (id: number, targetIds: number[]) => {
		return await loadingWrapper(() =>
			api.collection('links').url(url).removeLinks(id, targetIds)
		)
	}

	const addAttachment = async (
		id: number,
		fieldName: string,
		attachmentId: number
	) => {
		return await loadingWrapper(() =>
			api
				.collection('attachment')
				.url(url)
				.addAttachment(id, fieldName, attachmentId)
		)
	}

	const removeAttachment = async (id: number, fieldName: string) => {
		return await loadingWrapper(() =>
			api.collection('attachment').url(url).removeAttachment(id, fieldName)
		)
	}

	const updatePositions = async (sorted: Record<string, any>[]) => {
		// Intentionally avoid loading for drag-drop UIs
		return await api.collection(name).url(url).updatePositions(sorted)
	}

	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
		setResource({
			...resource,
			[name]: value,
		})
	}

	const loadingWrapper = async (apiMethod: () => any) => {
		try {
			showLoading()
			setErrors(null)
			const res = await apiMethod()
			if (res?.data?.id) {
				setResource(res.data)
			} else if (res?.error) {
				handleErrors(res?.error)
			}
			return res?.data
		} catch (e) {
		} finally {
			hideLoading()
		}
	}

	const handleErrors = (e: any) => {
		if (e?.response?.status === 401) {
			router.push('/login')
		}
		if (e?.data?.errors) {
			setErrors(e?.data?.errors)
		}
		console.log('handleErrors', e)
	}

	return {
		api,
		loading,
		setLoading,
		loadingWrapper,
		errors,
		setErrors,
		handleChange,
		handleErrors,
		resource,
		resources,
		setResource,
		setResources,
		findOne,
		findMany,
		reloadMany,
		save,
		update,
		create,
		destroy,
		updateMany,
		deleteMany,
		publish,
		unpublish,
		addLinks,
		removeLinks,
		addAttachment,
		removeAttachment,
		updatePositions,
		query,
		setQuery,
		meta,
		page,
		perPage,
		totalCount,
		numPages,
		sort,
		paginate,
		loadMore,
	}
}

export default useResource
