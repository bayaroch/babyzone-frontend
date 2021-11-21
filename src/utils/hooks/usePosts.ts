import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/posts'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { PageMeta, PageMetaParams } from '@services/post.services'
import { WP_REST_API_Posts } from 'wp-types'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.getAllPosts)

const usePosts = (): {
  meta: Meta
  list: WP_REST_API_Posts
  getList: (params: PageMetaParams) => void
  paginationMeta: PageMeta
  loadMore: (indexRange: any) => Promise<void>
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPostsMeta)
  const list = useSelector(selectors.posts)
  const paginationMeta = useSelector(selectors.paginationMeta)
  const getList = (params: PageMetaParams) =>
    dispatch(actions.getAllPosts(params))

  const loadMore = async ({
    stopIndex,
  }: {
    startIndex: number
    stopIndex: number
  }) => {
    if (stopIndex + 1 < paginationMeta.total_page) {
      dispatch(
        actions.getAllPosts({ page: paginationMeta.page + 1, per_page: 10 })
      )
    }
    return Promise.resolve()
  }

  return { meta, list, getList, paginationMeta, loadMore }
}

export default usePosts
