/*
 * Homepage
 */

import usePosts from '@utils/hooks/usePosts'
import { useEffect } from 'react'
import MediaCard from '@components/MediaCard'
import _ from 'lodash'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@components/Layouts/MainLayout'
import Intro from '@containers/Intro'
import { Typography } from '@mui/material'

const HomePage: PageWithLayoutType = () => {
  const { getList, list } = usePosts()
  const isPublic = false

  useEffect(() => {
    getList({ per_page: 10, page: 1 })
  }, [])

  const listItems =
    list &&
    list.map((post) => (
      <MediaCard
        key={post.id}
        title={post.title.rendered}
        date={post.date}
        desc={post.excerpt.rendered}
        term={
          _.get(post, "_embedded['wp:term'][0][0].name", undefined) as string
        }
        media={
          _.get(
            post,
            "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url",
            undefined
          ) as string
        }
        id={post.id}
      />
    ))

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {isPublic ? (
        <>
          <Intro />
          {listItems}
        </>
      ) : (
        <>
          <Typography variant="h2" mt={3} mb={4} align="center">
            Coming Soon
          </Typography>
          <img src="./images/logo-full.svg" width={'100%'} height="auto" />
        </>
      )}
    </div>
  )
}

export default HomePage

HomePage.Layout = MainLayout
