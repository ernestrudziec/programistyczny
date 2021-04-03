import React, { useEffect } from 'react';
import Head from 'next/head';
import { apollo } from '../../lib/apolloClient';
import { getAllPagesQuery, getPageBySlugQuery } from '../../graphql/queries';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import materialOceanTheme from '../../lib/MaterialOcean';
import materialOceanThemeCSS from '../../lib/MaterialOceanCSS';
import Layout from '../../components/Layout';
import CategoryTile from '../../components/CategoryTile';

const renderers = {
	code: ({ language, value }) => {
		console.log(language);
		return (
			<SyntaxHighlighter
				showLineNumbers={true}
				language={language}
				children={value}
				style={language !== 'css' ? materialOceanTheme : materialOceanThemeCSS}
			/>
		);
	},
};

export const getStaticPaths = async () => {
	const { data } = await apollo.query({ query: getAllPagesQuery });

	return {
		paths: data.articles.map(({ slug }) => ({
			params: { article: slug },
		})),
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const { data } = await apollo.query({ query: getPageBySlugQuery(params.article) });

	return {
		props: {
			slug: params.article,
			data: data.article,
		},
	};
};

export default function Article({ data }) {
	useEffect(() => {
		console.log(data);
	});

	const { slug, id, content, title, color, categories, date, authors, tags } = data;

	return (
		<Layout>
			<Head>
				<title>{slug}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="article-template">
				<div className="container">
					<div
						className="heading"
						style={{ background: `linear-gradient(180deg, ${color[0]?.css},${color[1]?.css})` }}
					>
						<h1>{title}</h1>
						<ul className="tags">
							{tags.map((item) => {
								return <li>#{item}</li>;
							})}
						</ul>
						<ul className="categories">
							{categories.map((item) => {
								return (
									<CategoryTile
										imgUrl={item.category_icon.url}
										name={item.name}
										color={item.categoryColor.css}
									/>
								);
							})}
						</ul>
					</div>
					<ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>
				</div>
			</div>
		</Layout>
	);
}
