import React, { useContext } from 'react'
import { ApiContext } from 'webstudio/context/core'

const useApi = () => {
	const { api } = useContext(ApiContext)
	return {
		api,
	}
}

export default useApi
