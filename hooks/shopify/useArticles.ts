import React, { useState, useContext } from 'react'
import { ShopContext } from 'webstudio/context'
import { useLoadingWrapper } from 'webstudio/hooks'

const useArticles = () => {
	const { shopifyClient } = useContext(ShopContext)
	const { errors, loading, loadingWrapper } = useLoadingWrapper()

	const [article, setArticle] = useState<Record<string, any>>()
	const [articles, setArticles] = useState<Record<string, any>[]>()

	const fetchArticle = async (blogHandle, articleHandle, perPage = 250) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findArticle(blogHandle, articleHandle, perPage)
		)
		setArticle(response?.data)
		return response?.data
	}

	const fetchArticles = async (perPage = 250) => {
		const response = await loadingWrapper(() =>
			shopifyClient.findArticles(perPage)
		)
		setArticles(response?.data)
		return response?.data
	}

	return {
		article,
		articles,
		fetchArticle,
		fetchArticles,
		loading,
		errors,
	}
}

export default useArticles
