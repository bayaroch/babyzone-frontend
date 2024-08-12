import React from 'react'
import { useQuery } from 'react-query'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import Seo from '@components/Seo'
import { postServices } from '@services/post.services'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import _ from 'lodash'

const Pregnancy: PageWithLayoutType = () => {
  const fields =
    'id,content,date,acf,slug,tags,title,excerpt,_links.wp:featuredmedia,_links.author,_links.wp:term,_embedded'
  const { data: list, status, error, refetch } = useQuery<
    { data: WP_REST_API_Posts; headers: number },
    Error
  >(
    'pregnancyPosts',
    () => postServices.getAllPregnancy({ per_page: 100, page: 1 }, `${fields}`),
    {
      enabled: false, // This prevents the query from running automatically
    }
  )

  React.useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <MainLayout>
      <Seo
        title="Pregnancy"
        description="Pregnancy information"
        image="images/gender_chart.jpg"
      />
      <Container maxWidth="lg" sx={{ padding: { xs: '16px', sm: '24px' } }}>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'error' && (
          <Typography color="error">Error: {error.message}</Typography>
        )}
        {status === 'success' && list && (
          <Grid container spacing={3}>
            {list &&
              list.data.map((post: WP_REST_API_Post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        _.get(
                          post,
                          "_embedded['wp:featuredmedia'][0].source_url",
                          'placeholder-image-url'
                        ) as string
                      }
                      alt={post.title?.rendered}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {post.title?.rendered}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.excerpt?.rendered
                          .replace(/<[^>]+>/g, '')
                          .slice(0, 100)}
                        ...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </MainLayout>
  )
}

export default Pregnancy
