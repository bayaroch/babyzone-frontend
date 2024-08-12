import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Container, Grid, Typography } from '@mui/material'
import _ from 'lodash'

import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import CategoryMenu from '@containers/CategoryMenu'
import Content from '@components/Content'
import Loader from '@components/Loader'
import Seo from '@components/Seo'
import { primarymenu } from '@constants/menu.constants'
import { pageServices } from '@services/page.services'
import { WP_REST_API_Post } from 'wp-types'

const Terms: PageWithLayoutType = () => {
  const router = useRouter()
  const { slug } = router.query

  const fetchPage = async (
    slug: string
  ): Promise<WP_REST_API_Post | undefined> => {
    const data = await pageServices.page(slug)
    return data[0] // Assuming we want the first page if multiple are returned
  }

  const { data: detail, status, error, refetch } = useQuery(
    ['page', slug],
    () => fetchPage(slug as string),
    {
      enabled: !!slug,
    }
  )

  const seo = _.find(primarymenu, { slug: slug as string })

  React.useEffect(() => {
    if (slug) {
      refetch()
    }
  }, [slug, refetch])

  const renderContent = () => {
    if (!detail) return null

    return (
      <>
        <Typography
          mb={1}
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
          {detail.title.rendered}
        </Typography>
        {_.get(
          detail,
          "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url"
        ) && (
          <img
            style={{ width: '100%', height: 'auto' }}
            src={
              _.get(
                detail,
                "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                ''
              ) as string
            }
            alt={detail.title.rendered}
          />
        )}
        <Content
          sx={{
            padding: {
              xs: 2,
              md: 1,
              lg: 4,
            },
            paddingTop: {
              sm: 0,
            },
          }}
          content={detail.content.rendered}
        />
      </>
    )
  }

  return (
    <MainLayout>
      {seo && (
        <Seo
          title={seo.label}
          description={seo.seo?.content || ''}
          image={seo.seo?.image}
        />
      )}
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: '0',
            sm: '0',
          },
        }}
      >
        <Grid container columnSpacing={{ xs: 0 }}>
          <Grid item xs={12} md={8}>
            {status === 'loading' && <Loader />}
            {status === 'error' && (
              <Typography>Error: {(error as Error).message}</Typography>
            )}
            {status === 'success' &&
              (detail ? (
                renderContent()
              ) : (
                <Typography>Хуудас олдсонгүй</Typography>
              ))}
          </Grid>
          <Grid md={4} item>
            <CategoryMenu category={undefined} />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default Terms
