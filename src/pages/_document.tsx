import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Gorest Blog Posts</title>
        <meta name="description" content="Blog posts from Gorest API" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
