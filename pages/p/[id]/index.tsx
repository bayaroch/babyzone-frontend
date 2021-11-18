/*
 * Homepage
 */

import PageWithLayoutType from '@constants/page'

const Detail: PageWithLayoutType = ({ posts }: any) => {
  console.log(posts)

  return <>{}</>
}

Detail.getInitialProps = async ({ query }) => {
  const { id } = query
  const res = await fetch(
    `http://localhost/api/wp-json/wp/v2/posts?filter[p]=${id}`
  )
  const json = await res.json()
  return { posts: json[0] }
}

export default Detail
