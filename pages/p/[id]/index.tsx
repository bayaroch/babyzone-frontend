/*
 * Detail Page
 */
import { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import _ from 'lodash'
import Content from '@components/Content'
import { Typography } from '@mui/material'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  const article: WP_REST_API_Post = _.isArray(posts) ? posts[0] : undefined
  // eslint-disable-next-line no-console
  console.log(article)
  return (
    <MainLayout>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Typography mb={3} variant="h1" align="center">
          {article && article.title.rendered}
        </Typography>
        <img
          style={{ maxWidth: '100%', height: 'auto' }}
          src={
            _.get(
              article,
              "_embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url",
              ''
            ) as string
          }
        />
        <Content
          padding={3}
          content={article ? article.content.rendered : ''}
        />
      </div>
    </MainLayout>
  )
}

Detail.getInitialProps = async ({
  query,
}): Promise<{ posts: WP_REST_API_Posts } | undefined> => {
  const { id } = query
  const res = await fetch(`${URI.ALL_POSTS}?include[]=${id}&_embed`)
  const json = await res.json()
  return { posts: json }
}

export default Detail
