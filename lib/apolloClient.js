// lib/apolloClient.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apollo = new ApolloClient({
	ssrMode: typeof window === 'undefined', // set to true for SSR
	link: new HttpLink({
		uri: 'https://api-eu-central-1.graphcms.com/v2/ckmwhviayfkjr01xr7b5p8xbp/master',
	}),
	cache: new InMemoryCache(),
});
