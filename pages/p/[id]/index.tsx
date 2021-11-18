/*
 * Detail Page
 */
import { WP_REST_API_Posts } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import _ from 'lodash'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  const article = _.isArray(posts) ? posts[0] : undefined
  return <MainLayout>{JSON.stringify(article)}</MainLayout>
}

Detail.getInitialProps = async ({
  query,
}): Promise<{ posts: WP_REST_API_Posts } | undefined> => {
  const { id } = query
  const res = await fetch(`${URI.ALL_POSTS}?filter[p]=${id}`)
  const json = await res.json()
  return { posts: json }
}

export default Detail
