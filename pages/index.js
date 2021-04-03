import Head from 'next/head';
import { useEffect } from 'react';
import { getAllPagesQuery } from '../graphql/queries';
import { apollo } from '../lib/apolloClient';
import Layout from '../components/Layout';

export const getStaticProps = async () => {
	const data = await apollo.query({ query: getAllPagesQuery });

	return {
		props: {
			data: data,
		},
	};
};

export default function Home({ data }) {
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<Layout>
			<Head>
				<title>Programistyczny - Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</Layout>
	);
}
