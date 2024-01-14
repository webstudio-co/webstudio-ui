import React, { useContext, useState } from 'react'
import { ShopContext } from 'webstudio/context'
import { useLoadingWrapper } from 'webstudio/hooks'

const useMetaobjects = () => {
	const { shopifyClient } = useContext(ShopContext)
	const { loading, errors, loadingWrapper } = useLoadingWrapper()

	const [metaobject, setMetaobject] = useState()
	const [metaobjects, setMetaobjects] = useState()

	const fetchMetaobject = async (handle, type, perPage = 250) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findMetaobject(handle, type, perPage)
		)
		setMetaobject(response?.data)
		return response?.data
	}

	const fetchMetaobjects = async (type, perPage = 250) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findMetaobjects(type, perPage)
		)
		setMetaobjects(response?.data)
		return response?.data
	}

	// Helper methods to get a field from a metaobject
	const getField = (metaobject, key) => {
		return metaobject?.fields?.find((field) => field.key == key)
	}

	const getValue = (metaobject, key) => {
		let field = getField(metaobject, key)
		return field?.value
	}

	const getImage = (metaobject, key) => {
		let field = getField(metaobject, key)
		return field?.reference?.image?.url
	}

	const getReference = (metaobject, key) => {
		let field = getField(metaobject, key)
		return field?.reference
	}

	const getReferences = (metaobject, key) => {
		let field = getField(metaobject, key)
		return field?.references?.edges.map((e) => e.node)
	}

	return {
		getField,
		getValue,
		getImage,
		getReference,
		getReferences,
		metaobject,
		metaobjects,
		fetchMetaobject,
		fetchMetaobjects,
		loading,
		errors,
	}
}

export default useMetaobjects
