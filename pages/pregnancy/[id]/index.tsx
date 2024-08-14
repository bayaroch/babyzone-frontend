/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useQuery } from 'react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
import _ from 'lodash'
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Head from 'next/head'

import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import Loader from '@components/Loader'

import { WP_REST_API_Posts } from 'wp-types'
import { postServices } from '@services/post.services'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Content from '@components/Content'

interface TabPanelProps {
  children?: string
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Content content={children as string} />
        </Box>
      )}
    </div>
  )
}

interface TabData {
  label: string
  content: string
}

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
  const [value, setValue] = useState<number>(0)

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
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

  const tabData: TabData[] = [
    {
      label: 'Хүүхдийн өсөлт:',
      content: _.get(article, 'acf.baby_growth', '') as string,
    },
    {
      label: 'Шинж тэмдэг',
      content: _.get(article, 'acf.symptoms', '') as string,
    },
    {
      label: 'Зөвлөгөө',
      content: _.get(article, 'acf.advice', '') as string,
    },
  ]

  return (
    <MainLayout containerSX={{ paddingTop: 0 }}>
      {seo && (
        <Head>
          <title>{seo?.title}</title>
          <meta name="description" content={seo?.description} />
          {/* Add other SEO meta tags as needed */}
        </Head>
      )}
      {article && (
        <>
          <Box
            sx={{
              backgroundColor: 'rgb(233,60,127)',
              background:
                'linear-gradient(180deg, rgba(233,60,127,1) 0%, rgba(244,100,156,1) 35%, rgba(248,191,128,1) 100%)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 10,
              paddingTop: 10,
              position: 'relative',
              // '&:after': {
              //   background: 'rgb(255, 255, 255)',
              //   borderRadius: '50%',
              //   bottom: '-50px',
              //   content: "''",
              //   display: ' block',
              //   height: '100px',
              //   position: 'absolute',
              // },
            }}
          >
            <Container>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: 150,
                    width: 150,
                    height: 150,
                    boxShadow: 4,
                    border: '2px solid #fff',
                  }}
                  src={
                    (_.get(
                      article,
                      "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url",
                      ''
                    ) as string) ||
                    (_.get(
                      article,
                      "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                      ''
                    ) as string)
                  }
                />
                <Typography
                  mb={1}
                  variant="h1"
                  align="center"
                  sx={{
                    padding: 1,
                    mt: 2,
                    fontSize: { lg: 28, md: 20, sm: 20, xs: 20 },
                    color: '#fff',
                  }}
                >
                  {article.title.rendered}
                </Typography>
                <IconButton sx={{ left: 0, position: 'absolute' }}>
                  <ChevronLeft sx={{ color: '#fff' }} fontSize={'large'} />
                </IconButton>
                <IconButton sx={{ right: 0, position: 'absolute' }}>
                  <ChevronRight sx={{ color: '#fff' }} fontSize={'large'} />
                </IconButton>
              </Box>
            </Container>
          </Box>
          <Container maxWidth="lg" sx={{ padding: { sm: 0, xs: 0 } }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="content tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  label={
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://source.unsplash.com/random/300x200?sig=${index}`}
                          alt={tab.label}
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ p: 2 }}
                        >
                          {tab.label}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  }
                  id={`tab-${index}`}
                  aria-controls={`tabpanel-${index}`}
                />
              ))}
            </Tabs>
            <Box>
              <Card>
                {tabData.map((tab, index) => (
                  <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                  </TabPanel>
                ))}
              </Card>
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2}>
                <Share sx={{ padding: { lg: 0, xs: 2 } }} />
              </Grid>
            </Grid>
            <Comment router={router} />
          </Container>
        </>
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
