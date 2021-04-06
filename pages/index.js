import Head from 'next/head';
import { useEffect } from 'react';
import { getAllPagesQuery } from '../graphql/queries';
import { apollo } from '../lib/apolloClient';
import Layout from '../components/Layout';
import ArticleTile from '../components/ArticleTile';

export const getStaticProps = async () => {
	const { data } = await apollo.query({ query: getAllPagesQuery });

	return {
		props: {
			articles: data.articles,
		},
	};
};

export default function Home({ articles }) {
	useEffect(() => {
		console.log(articles);
	}, [articles]);

	return (
		<Layout>
			<Head>
				<title>Programistyczny - Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="home-page">
				<div className="container">
					<div className="article-tiles-container">
						{articles.map((data) => {
							return <ArticleTile data={data} />;
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
}
