import { ApolloProvider } from '@apollo/client';
import { apollo } from '../lib/apolloClient';
import '../scss/style.scss';

export default function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={apollo}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
