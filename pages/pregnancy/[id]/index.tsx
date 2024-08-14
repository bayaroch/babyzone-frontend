/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useQuery } from 'react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
import _ from 'lodash'
import { Box, Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'

import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import Loader from '@components/Loader'

import { WP_REST_API_Posts } from 'wp-types'
import { postServices } from '@services/post.services'

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
}

const Detail: React.FC<DetailProps> = ({ seo }) => {
  const router = useRouter()
  const { id } = router.query
  const postId = id ? Number(id) : undefined

  const { data: postData, status: postStatus } = useQuery<
    WP_REST_API_Posts,
    Error
  >(
    ['post', postId],
    () =>
      postId
        ? postServices.postPregnancyDetail(postId)
        : Promise.reject('No post ID'),
    {
      enabled: !!postId,
    }
  )

  if (!postId) {
    return <div>Invalid post ID</div>
  }

  if (postStatus === 'loading') {
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

  if (postStatus === 'error' || !postData) {
    return <Typography color="error">Error loading data</Typography>
  }

  const article = postData[0]
  const time = article?.date ? CommonHelper.staticSmartTime(article.date) : ''

  return (
    <MainLayout>
      {seo && (
        <Head>
          <title>{seo?.title}</title>
          <meta name="description" content={seo?.description} />
          {/* Add other SEO meta tags as needed */}
        </Head>
      )}
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

          <Box>test:{JSON.stringify(article)}</Box>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <Share sx={{ padding: { lg: 0, xs: 2 } }} />
            </Grid>
          </Grid>
          <Comment router={router} />
        </Container>
      )}
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${URI.ALL_POST_DATA}?post_type=pregnancy`)
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
    const [seoRes] = await Promise.all([axios.get(`${URI.SEO}/${params.id}`)])

    return {
      props: {
        seo: seoRes.data,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { error: true } }
  }
}

export default Detail