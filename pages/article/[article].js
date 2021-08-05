import React, { useEffect } from "react";
import Head from "next/head";
import { apollo } from "../../lib/apolloClient";
import { getAllPagesQuery, getPageBySlugQuery } from "../../graphql/queries";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import materialOceanTheme from "../../lib/MaterialOcean";
import materialOceanThemeCSS from "../../lib/MaterialOceanCSS";
import Layout from "../../components/Layout";
import CategoryTile from "../../components/CategoryTile";
import { DateTime, Duration } from "luxon";
import Categories from "../../components/Categories";
// import Duration from 'luxon';

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        language={language}
        children={value}
        style={language !== "css" ? materialOceanTheme : materialOceanThemeCSS}
      />
    );
  }
};

export const getStaticPaths = async () => {
  const { data } = await apollo.query({ query: getAllPagesQuery });

  return {
    paths: data.articles.map(({ slug }) => ({
      params: { article: slug }
    })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const { data } = await apollo.query({
    query: getPageBySlugQuery(params.article)
  });

  return {
    props: {
      slug: params.article,
      data: data.article
    }
  };
};

const getDateString = (date, duration) => {
  const getPlural = (unit, number) => {
    const DAYS_LOCALE = ["dzień", "dni"];
    const HOURS_LOCALE = ["godzinę", "godziny", "godzin"];
    const MINUTES_LOCALE = ["minutę", "minuty", "minut"];

    const LAST_DIGIT = parseInt(
      number.toString()[number.toString().length - 1]
    );
    switch (unit) {
      case "days":
        if (number > 1) {
          return DAYS_LOCALE[1];
        } else return DAYS_LOCALE[0];
        break;
      case "hours":
        if (number == 1) {
          return HOURS_LOCALE[0];
        } else if (LAST_DIGIT > 1 && LAST_DIGIT < 5) {
          return HOURS_LOCALE[1];
        } else {
          return HOURS_LOCALE[2];
        }
        break;
      case "minutes":
        if (number == 1) {
          return MINUTES_LOCALE[0];
        } else if (LAST_DIGIT > 1 && LAST_DIGIT < 5) {
          return MINUTES_LOCALE[1];
        } else {
          return MINUTES_LOCALE[2];
        }
        break;
    }
  };

  let finalString = date;

  if (duration.days < 4) {
    if (duration.days > 0) {
      finalString = `${Math.round(duration.days, 0)} ${getPlural(
        "days",
        duration.days
      )} temu`;
    } else {
      if (duration.hours == 0) {
        finalString = `${Math.round(duration.minutes, 0)} ${getPlural(
          "minutes",
          Math.round(duration.minutes, 0)
        )} temu`;
      } else {
        finalString = `${Math.round(duration.hours, 0)} ${getPlural(
          "hours",
          duration.hours
        )} temu`;
      }
    }
  }

  return finalString;
};

export default function Article({ data }) {
  const DATE_NOW = DateTime.now().setLocale("pl");
  const DATE = DateTime.fromISO(data.date).setLocale("pl");
  const dateStringOptions = { month: "long", day: "numeric", year: "numeric" };
  const DATE_STRING = DATE.toLocaleString(dateStringOptions);
  const DURATION = Duration.fromMillis(DATE_NOW - DATE)
    .shiftTo("days", "hours", "minutes")
    .toObject();

  const {
    slug,
    id,
    content,
    title,
    color,
    categories,
    authors,
    tags,
    thumbnail
  } = data;

  return (
    <Layout>
      <Head>
        <title>Artykuł - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="date">
        <img src="/assets/clock.svg" />
        <span>{getDateString(DATE_STRING, DURATION)}</span>
      </div>

      <article className="article-template">
        <div className="container">
          <div
            className="heading"
            style={{
              background: `linear-gradient(180deg, ${color.map(
                (item) => item.css
              )})`
            }}
          >
            <h1>{title}</h1>
            <ul className="tags">
              {tags.map((item) => {
                return <li key={item}>#{item}</li>;
              })}
            </ul>
            <Categories categories={categories} />
          </div>

          <ReactMarkdown renderers={renderers}>{content}</ReactMarkdown>
        </div>
      </article>
      <div id="disqus_thread" className="article-disqus"></div>
    </Layout>
  );
}
