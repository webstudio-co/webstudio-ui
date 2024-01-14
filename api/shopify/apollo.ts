import { useMemo } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

let apolloClient

function createApolloClient(
	domain: string,
	storefrontAccessToken: string,
	apiVersion: string = '2023-10'
) {
	const httpLink = createHttpLink({
		uri: `https://${domain}/api/${apiVersion}/graphql.json`,
	})

	const middlewareLink = setContext(() => ({
		headers: {
			'Content-Type': 'application/graphql',
			'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
		},
	}))

	return new ApolloClient({
		//@ts-ignore
		link: middlewareLink.concat(httpLink),
		cache: new InMemoryCache(),
	})
}

export function initApollo(domain, storefrontAccessToken, apiVersion) {
	const _apolloClient =
		apolloClient ??
		createApolloClient(domain, storefrontAccessToken, apiVersion)

	// If your page has Next.js data fetching methods that use Apollo Client, the initial state
	// gets hydrated here
	//if (initialState) {
	//  _apolloClient.cache.restore(initialState);
	//}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient
	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient

	return _apolloClient
}

export function useApollo(domain, storefrontAccessToken, apiVersion) {
	const store = useMemo(
		() => initApollo(domain, storefrontAccessToken, apiVersion),
		[domain, storefrontAccessToken]
	)
	return store
}
