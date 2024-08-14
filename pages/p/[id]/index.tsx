/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useQuery } from 'react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
import _ from 'lodash'
import { Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'

import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import Content from '@components/Content'
import { Author, Slider } from '@components/PostElements'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { StepItemType } from '@components/PostElements/Steps'
import RelatedPosts, {
  Related_Post,
} from '@components/PostElements/RelatedPosts'
import Loader from '@components/Loader'

import { WP_REST_API_Post, WP_REST_API_Tags } from 'wp-types'
import { postServices } from '@services/post.services'
import { taxonomyServices } from '@services/taxonomy.services'

const Share = dynamic(() => import('@components/PostElements/Share'), {
  ssr: false,
  loading: () => <div>Loading share buttons...</div>,
})

const Comment = dynamic(
  () => import('@components/PostElements/FacebookComment'),
  {
    ssr: false,
    loading: () => <div>Loading comments...</div>,
  }
)

export interface CustomPostResponse {
  id: number
  slug: string
  content: string
  title: string
  featured_img_src: string
  url: string
}

interface SeoData {
  title: string
  description: string
  // Add other SEO fields as needed
}

interface DetailProps {
  error?: boolean
  seo?: SeoData
  initialData?: WP_REST_API_Post
}

const Detail: React.FC<DetailProps> = ({ seo, initialData }) => {
  const router = useRouter()
  const { id } = router.query
  const postId = id ? Number(id) : undefined

  const { data: postData, status: postStatus } = useQuery<
    WP_REST_API_Post,
    Error
  >(
    ['post', postId],
    () =>
      postId ? postServices.postDetail(postId) : Promise.reject('No post ID'),
    {
      enabled: !!postId && !initialData,
      initialData: initialData,
    }
  )

  const { data: tagsData, status: tagsStatus } = useQuery<
    WP_REST_API_Tags,
    Error
  >(
    ['tags', postId],
    () =>
      postId
        ? taxonomyServices.getTagsById(postId)
        : Promise.reject('No post ID'),
    { enabled: !!postId }
  )

  const { data: relatedPosts, status: relatedStatus } = useQuery<
    Related_Post[],
    Error
  >(
    ['relatedPosts', postId],
    () =>
      postId ? postServices.relatedPosts(postId) : Promise.reject('No post ID'),
    { enabled: !!postId }
  )

  if (!postId) {
    return <div>Invalid post ID</div>
  }

  if (
    postStatus === 'loading' ||
    tagsStatus === 'loading' ||
    relatedStatus === 'loading'
  ) {
    return (
      <Loader
        width="100%"
        height={200}
        display="flex"
        alignItems="center"
        justifyContent="center"
      />
    )
  }

  if (
    postStatus === 'error' ||
    tagsStatus === 'error' ||
    relatedStatus === 'error'
  ) {
    return <Typography color="error">Error loading data</Typography>
  }

  const article = postData
  const time = article?.date ? CommonHelper.staticSmartTime(article.date) : ''
  const sliderImages = _.get(article, 'acf.featured_slide', []) as any[]
  const steps = _.get(article, 'acf.steps', []) as StepItemType[]

  return (
    <MainLayout>
      <Head>
        <title>{seo?.title || article?.title.rendered}</title>
        <meta
          name="description"
          content={seo?.description || article?.excerpt.rendered}
        />
        {/* Add other SEO meta tags as needed */}
      </Head>
      {article && (
        <Container maxWidth="lg" sx={{ padding: { sm: 0, xs: 0 } }}>
          <Typography
            mb={1}
            variant="h1"
            align="center"
            sx={{ padding: 1, fontSize: { lg: 28, md: 20, sm: 18, xs: 16 } }}
          >
            {article.title.rendered}
          </Typography>
          <Typography mb={2} color="#aaa" variant="body2" align="center">
            {time}
          </Typography>

          {Array.isArray(sliderImages) && !_.isEmpty(sliderImages) ? (
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
              alt={article.title.rendered}
            />
          )}
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
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
                  link: _.get(article, '_embedded.author[0].url', '') as string,
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Content
                steps={steps}
                content={article.content.rendered}
                tags={tagsData || []}
                sx={{ padding: { xs: 2, md: 1, lg: 4 }, paddingTop: { sm: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Share sx={{ padding: { lg: 0, xs: 2 } }} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
              {relatedPosts ? (
                <RelatedPosts data={relatedPosts} />
              ) : (
                <Loader
                  width="100%"
                  height={200}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />
              )}
            </Grid>
            <Grid item xs={12} md={2}></Grid>
          </Grid>
          <Comment router={router} />
        </Container>
      )}
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(URI.ALL_POST_DATA)
  const posts: CustomPostResponse[] = res.data

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true }
  }

  try {
    const [seoRes, postRes] = await Promise.all([
      axios.get(`${URI.SEO}/${params.id}`),
      axios.get(`${URI.ALL_POSTS}?include[]=${params.id}&_embed`),
    ])

    return {
      props: {
        seo: seoRes.data,
        initialData: postRes.data[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { error: true } }
  }
}

export default Detail
