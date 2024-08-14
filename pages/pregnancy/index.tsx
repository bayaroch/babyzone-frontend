import React from 'react'
import { useQuery } from 'react-query'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material'
import Seo from '@components/Seo'
import { postServices } from '@services/post.services'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import _ from 'lodash'
import Loader from '@components/Loader'
import Link from 'next/link'

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

  const orderById = _.orderBy(list?.data, ['id'], ['asc'])

  return (
    <MainLayout>
      <Seo
        title="Pregnancy"
        description="Pregnancy information"
        image="images/gender_chart.jpg"
      />
      <Container maxWidth="lg" sx={{ padding: { xs: '16px', sm: '24px' } }}>
        {status === 'loading' && (
          <Box sx={{ textAlign: 'center' }}>
            <Loader />
          </Box>
        )}
        {status === 'error' && (
          <Typography color="error">Error: {error.message}</Typography>
        )}
        {status === 'success' && list && (
          <Grid container spacing={3}>
            {list &&
              orderById.map((post: WP_REST_API_Post) => (
                <Grid item xs={4} sm={3} md={2} key={post.id}>
                  <MuiLink href={`/pregnancy/${post.id}`} component={Link}>
                    <Card
                      sx={{ background: (theme) => theme.palette.primary.main }}
                    >
                      <Box sx={{ paddingTop: '100%', position: 'relative' }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            '&:hover .bg-img': {
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <Box
                            className="bg-img"
                            sx={{
                              backgroundImage: `url(${
                                _.get(
                                  post,
                                  "_embedded['wp:featuredmedia'][0].source_url",
                                  'placeholder-image-url'
                                ) as string
                              })`,
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              position: 'absolute',
                              transition: 'all 0.8s ease',
                              backgroundSize: 'cover',
                              transform: 'scale(1.01)',
                            }}
                          />
                        </Box>
                      </Box>
                      <CardContent
                        sx={{
                          p: 0.5,
                          '&:last-child': { pb: 0 },
                          background: (theme) => theme.palette.primary.main,
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{
                            fontSize: 13,
                            padding: 0,
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 700,
                            lineHeight: 1.2,
                          }}
                          component="div"
                        >
                          {post.title?.rendered}
                        </Typography>
                      </CardContent>
                    </Card>
                  </MuiLink>
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </MainLayout>
  )
}

export default Pregnancy
