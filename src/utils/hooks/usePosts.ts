import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/posts'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { PageMeta } from '@services/post.services'
import { WP_REST_API_Posts } from 'wp-types'
import { PostParams } from '@store/posts/actions'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.getAllPosts)
const getPostsMetaByCategory = createMetaSelector(actions.getAllPostsbyCategory)
const usePosts = (
  category: number | undefined,
  tag?: number | undefined
): {
  meta: Meta
  metaCat: Meta
  list: WP_REST_API_Posts
  initList: (params: PostParams) => void
  paginationMeta: PageMeta
  loadMore: (indexRange: any) => Promise<void>
  initCatList: (params: PostParams) => void
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPostsMeta)
  const metaCat = useSelector(getPostsMetaByCategory)
  const list = useSelector(selectors.posts)
  const paginationMeta = useSelector(selectors.paginationMeta)
  const initList = (params: PostParams) => {
    dispatch(actions.initPosts({ ...params, category: category, tag: tag }))
  }

  const initCatList = (params: PostParams) => {
    if (category) {
      dispatch(
        actions.initPostsbyCategory({ ...params, category: category, tag: tag })
      )
    }
  }

  const loadMore = async ({}: { startIndex: number; stopIndex: number }) => {
    if (list.length < paginationMeta.total_page) {
      dispatch(
        actions.getAllPosts({
          page: paginationMeta.page + 1,
          per_page: 10,
          category,
          tag,
        })
      )
    }
    return Promise.resolve()
  }

  return {
    meta,
    list,
    initList,
    paginationMeta,
    loadMore,
    initCatList,
    metaCat,
  }
}

export default usePosts
