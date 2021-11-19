/*
 * Detail Page
 */
import { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types'
import { URI } from '@constants/uri.constants'
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import _ from 'lodash'
import Content from '@components/Content'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  const article: WP_REST_API_Post = _.isArray(posts) ? posts[0] : undefined
  return (
    <MainLayout>
      <div>{article && article.title.rendered}</div>
      <div>
        <Content content={article ? article.content.rendered : ''} />
      </div>
    </MainLayout>
  )
}

Detail.getInitialProps = async ({
  query,
}): Promise<{ posts: WP_REST_API_Posts } | undefined> => {
  const { id } = query
  const res = await fetch(`${URI.ALL_POSTS}?include[]=${id}`)
  const json = await res.json()
  return { posts: json }
}

export default Detail
