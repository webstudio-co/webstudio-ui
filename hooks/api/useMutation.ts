import React, { useContext } from 'react'
import { useState } from 'react'
import { ApiContext } from 'webstudio/context/core'
import { useRouter } from 'next/router'
import { MutationParams, Resource } from 'webstudio/types'

const useMutation = (props: MutationParams): Record<string, any> => {
	const { url, name = 'resource' } = props || {}

	const router = useRouter()
	const { api } = useContext(ApiContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<Record<string, any> | null>()
	const [data, setData] = useState<Resource>({})

	const showLoading = () => setLoading(true)
	const hideLoading = () => setLoading(false)

	const findOne = async (id: number) => {
		if (!id) return null
		await apiWrapper(() => api.collection(name).url(url).findOne(id))
	}

	const save = (data: Resource) => {
		if (data?.id) {
			return update(data)
		} else {
			return create(data)
		}
	}

	const create = async (data: Resource) => {
		apiWrapper(() => api.collection(name).url(url).create(data))
	}

	const update = async (data: Resource) => {
		apiWrapper(() => api.collection(name).url(url).update(data))
	}

	const destroy = async (id: Resource) => {
		apiWrapper(() => api.collection(name).url(url).destroy(id))
	}

	const updateMany = async (ids: number[], data: Resource) => {
		apiWrapper(() => api.collection(name).url(url).updateMany(ids, data))
	}

	const deleteMany = async (ids: number[]) => {
		apiWrapper(() => api.collection(name).url(url).destroyMany(ids))
	}

	const publish = async (id: number) => {
		apiWrapper(() => api.collection(name).url(url).publish(id))
	}

	const unpublish = async (data: Resource) => {
		apiWrapper(() => api.collection(name).url(url).unpublish(data))
	}

	const addLinks = async (
		id: number,
		contentType: string,
		dataIds: number[]
	) => {
		apiWrapper(() =>
			api.collection('links').url(url).addLinks(id, contentType, dataIds)
		)
	}

	const removeLinks = async (id: number, targetIds: number[]) => {
		apiWrapper(() =>
			api.collection('links').url(url).removeLinks(id, targetIds)
		)
	}

	const addAttachment = async (
		id: number,
		dataName: string,
		dataId: number
	) => {
		apiWrapper(() =>
			api.collection('attachment').url(url).addAttachment(id, dataName, dataId)
		)
	}

	const removeAttachment = async (
		id: number,
		dataName: string,
		dataId: number
	) => {
		apiWrapper(() =>
			api
				.collection('attachment')
				.url(url)
				.removeAttachment(id, dataName, dataId)
		)
	}

	const updatePositions = async (sorted: Record<string, any>[]) => {
		apiWrapper(api.collection(name).url(url).updatePositions(sorted))
	}

	const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = ev.target
		const value =
			ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value

		setData({
			...data,
			[name]: value,
		})
	}

	const apiWrapper = async (apiMethod: () => any) => {
		try {
			showLoading()
			setErrors(null)
			const res = await apiMethod()
			if (res?.data?.id) {
				setData(res.data)
			}
			return res.data
		} catch (e) {
			handleErrors(e)
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
		if (e?.data?.message) {
			setErrors({
				...errors,
				message: e?.data?.message,
			})
		}
		console.log('handleErrors', e)
	}

	return {
		// common
		loading,
		errors,
		handleChange,
		handleErrors,

		// Resource
		data,
		setData,
		findOne,
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
	}
}

export default useMutation
