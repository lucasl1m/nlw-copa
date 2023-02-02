import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="A simple project to practice Next.js" />

        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"/>

        <title>NLW Copa</title>
      </Head>
      <body className="bg-gray-900 bg-app bg-no-repeat bg-cover">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
