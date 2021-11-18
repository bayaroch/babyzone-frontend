/*
 * Homepage
 */

import usePosts from '@utils/hooks/usePosts'
import { useEffect } from 'react'
import MediaCard from '@components/MediaCard'
import _ from 'lodash'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@components/Layouts/MainLayout'

const HomePage: PageWithLayoutType = () => {
  const { getList, list } = usePosts()

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

  return <div style={{ maxWidth: 600 }}>{listItems}</div>
}

export default HomePage

HomePage.Layout = MainLayout
