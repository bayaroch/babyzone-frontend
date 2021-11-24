/*
 * Detail Page
 */
import { WP_REST_API_Post } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import _ from 'lodash'
import Content from '@components/Content'
import { Box, Container, Grid, Typography } from '@mui/material'
import { Author, Share, Slider } from '@components/PostElements/index'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { StepItemType } from '@components/PostElements/Steps'
import RelatedPosts from '@components/PostElements/RelatedPosts'
import useRelated from '@utils/hooks/useRelated'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '@components/Loader'
import useTags from '@utils/hooks/useTags'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  const article: WP_REST_API_Post = _.isArray(posts) ? posts[0] : undefined
  const router = useRouter()
  const { id } = router.query
  const { list, meta, relatedList } = useRelated()
  const { tags, tagList } = useTags()

  useEffect(() => {
    relatedList(Number(id))
    tagList(Number(id))
  }, [id])

  const time =
    article && article.date ? CommonHelper.staticSmartTime(article.date) : ''

  const sliderImages = _.get(article, 'acf.featured_slide', [])
  const steps: StepItemType[] = _.get(article, 'acf.steps', []) as []

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
        {article ? (
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
              {article && article.title.rendered}
            </Typography>
            <Typography mb={2} color={'#aaa'} variant="body2" align="center">
              {time}
            </Typography>

            {_.isArray(sliderImages) && !_.isEmpty(sliderImages) ? (
              <Slider
                sx={{ paddingBottom: '67%', position: 'relative' }}
                images={sliderImages}
              />
            ) : (
              <img
                style={{ width: '100%', height: 'auto' }}
                src={
                  _.get(
                    article,
                    "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                    ''
                  ) as string
                }
              />
            )}
            <Grid container spacing={1}>
              <Grid xs={12} md={2} item>
                <Author
                  sx={{
                    padding: { lg: 2, md: 2, sm: 2, xs: 2 },
                    paddingBottom: { sm: 0 },
                  }}
                  author={{
                    name: _.get(
                      article,
                      '_embedded.author[0].name',
                      ''
                    ) as string,
                    link: _.get(
                      article,
                      '_embedded.author[0].url',
                      ''
                    ) as string,
                  }}
                />
              </Grid>
              <Grid xs={12} md={8} item>
                <Content
                  steps={steps}
                  content={article ? article.content.rendered : ''}
                  tags={tags}
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
                />
              </Grid>
              <Grid xs={12} md={2} item>
                <Share
                  sx={{
                    padding: {
                      lg: 0,
                      xs: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid xs={12} md={2} item></Grid>
              <Grid xs={12} md={8} item>
                {!meta.pending && meta.loaded && list !== undefined ? (
                  <RelatedPosts data={list} />
                ) : (
                  <Loader
                    width={'100%'}
                    height={200}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  />
                )}
              </Grid>
              <Grid xs={12} md={2} item></Grid>
            </Grid>
          </>
        ) : (
          <Box>
            <Typography variant="h2" align="center">
              Мэдээлэл алга
            </Typography>
          </Box>
        )}
      </Container>
    </MainLayout>
  )
}

export default Detail

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getServerSideProps(context: any) {
  const { id } = context.query
  try {
    const res = await fetch(
      `${URI.ALL_POSTS}?include[]=${id}&_fields=id,content,date,acf,slug,tags,title,excerpt,_links.wp:featuredmedia,_links.author,_links.wp:term,_embedded`
    )
    return {
      props: {
        posts: await res.json(),
      },
    }
  } catch (error) {
    return { props: {} }
  }
}
