import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React, { ReactElement } from 'react'

class Document extends NextDocument {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    })

  const initialProps = await NextDocument.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">{initialProps.styles}</React.Fragment>,
    ],
  }
}

export default Document
