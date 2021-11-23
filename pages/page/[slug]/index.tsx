/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import { Container, Grid, Typography } from '@mui/material'
import Content from '@components/Content'
import { pageServices } from '@services/page.services'
import { WP_REST_API_Posts } from 'wp-types'
import _ from 'lodash'
import { GetServerSideProps } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Page({ posts }: { posts: WP_REST_API_Posts | undefined }) {
  // eslint-disable-next-line no-console
  const detail = posts ? posts[0] : undefined
  return (
    <MainLayout>
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: '0',
            sm: '0',
          },
        }}
      >
        {detail && !_.isEmpty(detail) ? (
          <Grid container columnSpacing={{ xs: 0 }}>
            <Grid item xs={12} md={8}>
              <Typography>{detail.title.rendered}</Typography>
              <Content content={``} />
            </Grid>
            <Grid md={4} item>
              Page Menu
            </Grid>
          </Grid>
        ) : (
          'Мэдээлэл алга'
        )}
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query
  const res = await pageServices.page(slug as string)
  if (_.isEmpty(res) || res === undefined) {
    return { props: {} }
  }
  return {
    props: {
      posts: res,
    },
  }
}

export default Page
