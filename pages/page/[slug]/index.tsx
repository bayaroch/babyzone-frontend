/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import { Container, Grid, Typography } from '@mui/material'
import CategoryMenu from '@containers/CategoryMenu'
import usePage from '@utils/hooks/usePage'
import { useEffect } from 'react'
import Content from '@components/Content'
import Loader from '@components/Loader'
import _ from 'lodash'
import Seo from '@components/Seo'
import { primarymenu } from '@constants/menu.constants'

const Terms: PageWithLayoutType = () => {
  const router = useRouter()
  const { slug } = router.query

  const { detail, initPage, meta } = usePage()

  const seo = _.find(primarymenu, { slug: slug as string })

  useEffect(() => {
    if (slug) initPage(slug as string)
  }, [slug])

  const renderContent = () => {
    if (detail !== undefined && meta.loaded && !meta.pending) {
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
          <img
            style={{ width: '100%', height: 'auto' }}
            src={
              _.get(
                detail,
                "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                ''
              ) as string
            }
          />
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
  }
  const renderLoader = () => {
    if (meta.pending) {
      return <Loader />
    }
  }

  const renderNotFound = () => {
    if (!meta.pending && meta.loaded && detail === undefined) {
      return <Typography>Хуудас олдсонгүй</Typography>
    }
  }

  // eslint-disable-next-line no-console
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
            {renderContent()}
            {renderLoader()}
            {renderNotFound()}
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
