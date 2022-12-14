import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="triage.ai" key="title"/>
        <meta property="og:description" content="Make sense of your symptoms using AI" key="description"/>
        <meta
          property="og:image"
          content="https://unsplash.com/photos/bD1bK7IUvd8"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
