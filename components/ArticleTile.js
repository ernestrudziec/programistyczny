import React, { useEffect } from 'react';
import Categories from '../components/Categories';
import Link from 'next/link';

export default function ArticleTile({ data }) {
	const { title, shortDescription, tags, categories, color, slug } = data;

	useEffect(() => {
		console.log(data);
	});

	return (
		<Link href={`/artykul/${slug}`}>
			<a className="article-tile">
				<article style={{ background: `linear-gradient(180deg, ${color.map((item) => item.css)} 180%)` }}>
					<h2>{title}</h2>
					<ul className="tags">
						{tags.map((tag) => {
							return <li>#{tag}</li>;
						})}
					</ul>
					<p>{shortDescription}</p>
					<Categories tile categories={categories} />
					<div className="read-more">
						<span>Kliknij i czytaj więcej</span>
					</div>
				</article>
			</a>
		</Link>
	);
}
