import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/posts'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { PageMeta } from '@services/post.services'
import { WP_REST_API_Posts } from 'wp-types'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.getAllPosts)

const usePosts = (): {
  meta: Meta
  list: WP_REST_API_Posts
  getList: (params: PageMeta) => void
  paginationMeta: PageMeta
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPostsMeta)
  const list = useSelector(selectors.posts)
  const paginationMeta = useSelector(selectors.paginationMeta)
  const getList = (params: PageMeta) => dispatch(actions.getAllPosts(params))

  return { meta, list, getList, paginationMeta }
}

export default usePosts
