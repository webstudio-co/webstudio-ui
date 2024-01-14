import { useApi } from 'webstudio/hooks'
import useSWR from 'swr'

type QueryResponse = {
	data: any
	loading: boolean
	error: any
}

type QueryProps = {
	url: string
	query?: Record<string, any>
	skip?: boolean
}

const useQuery = (props: QueryProps): QueryResponse => {
	const { api } = useApi()

	const { url, query, skip = false } = props

	const { data, error } = useSWR(!skip && url, (url: string) =>
		api.url(url).where(query).findMany()
	)

	return {
		data,
		loading: !data && !error,
		error,
	}
}

export default useQuery
