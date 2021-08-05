import Head from "next/head";
import { useEffect } from "react";
import { getAllPagesQuery } from "../graphql/queries";
import { apollo } from "../lib/apolloClient";
import Layout from "../components/Layout";
import ArticleTile from "../components/ArticleTile";
import { Author } from "../components/Author";
import Script from "next/script";

export const getStaticProps = async () => {
  const { data } = await apollo.query({ query: getAllPagesQuery });

  return {
    props: {
      articles: data.articles
    }
  };
};

export default function Home({ articles }) {
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  useEffect(() => {
    console.log(window);
    if (typeof window !== "undefined")
      window.DISQUSWIDGETS.getCount({ reset: true });
  }, []);
  return (
    <>
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
          <Author />
        </div>
      </Layout>
      <Script
        strategy="beforeInteractive"
        id="dsq-count-scr"
        src="//programistyczny.disqus.com/count.js"
        async
      ></Script>
    </>
  );
}
