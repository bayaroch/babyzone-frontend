import usePosts from '@utils/hooks/usePosts'
import { useEffect } from 'react'
import MediaCard from '@components/MediaCard'
import Box from '@mui/material/Box'
import _ from 'lodash'

const PostList: React.FC = () => {
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

  return <Box>{listItems}</Box>
}

export default PostList
