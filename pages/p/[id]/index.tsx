/*
 * Detail Page
 */
import { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import _ from 'lodash'
import Content from '@components/Content'
import { Container, Grid, Typography } from '@mui/material'
import { Author } from '@components/PostElements/index'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  const article: WP_REST_API_Post = _.isArray(posts) ? posts[0] : undefined
  // eslint-disable-next-line no-console
  console.log(article)
  return (
    <MainLayout>
      <Container
        maxWidth={'lg'}
        sx={{
          padding: {
            sm: 0,
            xs: 0,
          },
        }}
      >
        <Typography
          mb={3}
          variant="h1"
          align="center"
          sx={{
            padding: 1,
            fontSize: {
              lg: 28,
              md: 20,
              sm: 18,
              xs: 16,
            },
          }}
        >
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
        <Grid container spacing={1}>
          <Grid xs={12} md={2} item>
            <Author
              author={{
                name: _.get(article, '_embedded.author[0].name', '') as string,
                link: _.get(article, '_embedded.author[0].url', '') as string,
              }}
            />
          </Grid>
          <Grid xs={12} md={8} item>
            <Content
              content={article ? article.content.rendered : ''}
              sx={{
                padding: {
                  xs: 0,
                  md: 1,
                  lg: 4,
                },
              }}
            />
          </Grid>
          <Grid xs={12} md={2} item>
            share
          </Grid>
        </Grid>
      </Container>
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
