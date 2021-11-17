/*
 * Homepage
 */

import usePosts from '@utils/hooks/usePosts'
import { useEffect } from 'react'
import MediaCard from '@components/MediaCard'
import _ from 'lodash'

const HomePage = () => {
  const { getList, list, paginationMeta } = usePosts()

  useEffect(() => {
    getList({ per_page: 10, page: 1 })
  }, [])

  console.log(list && list[0]._embedded)

  const listItems =
    list &&
    list.map((post) => (
      <MediaCard
        key={post.id}
        title={post.title.rendered}
        date={post.date}
        media={
          _.get(
            post,
            "_embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url",
            ''
          ) as string
        }
        slug={post.slug}
      />
    ))

  return <div style={{ maxWidth: 600 }}>{listItems}</div>
}

export default HomePage
