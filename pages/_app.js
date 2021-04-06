import { ApolloProvider } from '@apollo/client';
import { apollo } from '../lib/apolloClient';
import '../scss/style.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			console.log(`App is changing to ${url} ${shallow ? 'with' : 'without'} shallow routing`);
		};

		const handleRouteChangeError = (err, url) => {
			if (err.cancelled) {
				console.log(`Route to ${url} was cancelled!`);
			}
		};

		const handleRouteComplete = (url, { shallow }) => {
			console.log(`App is routed complete to ${url} ${shallow ? 'with' : 'without'} shallow routing`);
		};

		router.events.on('routeChangeStart', handleRouteChange);
		router.events.on('routeChangeComplete', handleRouteComplete);
		router.events.on('routeChangeError', handleRouteChangeError);

		return () => {
			router.events.off('routeChangeComplete', handleRouteComplete);
			router.events.off('routeChangeStart', handleRouteChange);
			router.events.off('routeChangeError', handleRouteChangeError);
		};
	}, []);

	return (
		<ApolloProvider client={apollo}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
