import React from 'react'
import Head from 'next/head'

type SeoProps = {
  title: string
  description: string
  canonical?: string
  css?: string
  js?: string
  image?: string
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  css,
  js,
  image,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content="babyzone.mn" />
    {canonical && <meta property="og:url" content={`${canonical}`} />}

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="babyzone.mn" />
    <meta name="twitter:creator" content="babyzone" />

    {css && <link rel="stylesheet" href={`${css}`} />}
    {image ? (
      <>
        <meta property="og:image" content={`${image}`} />
        <meta property="og:image:url" content={`${image}`} />
      </>
    ) : (
      <>
        <meta property="og:image" content={`images/babyzone.jpg`} />
        <meta property="og:image:url" content={`images/babyzone.jpg`} />
      </>
    )}
    {image && <meta name="twitter:image" content={`${image}`} />}
    {canonical && <link rel="canonical" href={`${canonical}`} />}
    {js && <script type="text/javascript" src={`${js}`}></script>}
  </Head>
)

export default Seo
