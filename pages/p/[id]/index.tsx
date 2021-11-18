/*
 * Detail Page
 */
import { WP_REST_API_Posts } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'

interface PostPageProps {
  posts: WP_REST_API_Posts
}

const Detail = ({ posts }: PostPageProps) => {
  console.log(posts)

  return <MainLayout>{JSON.stringify(posts)}</MainLayout>
}

Detail.getInitialProps = async ({ query }: any) => {
  const { id } = query
  const res = await fetch(`${URI.ALL_POSTS}?filter[p]=${id}`)
  const json = await res.json()
  return { posts: json[0] }
}

export default Detail
