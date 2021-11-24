import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/posts'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { WP_REST_API_Post } from 'wp-types'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.detail)

const useDetail = (): {
  metaDetail: Meta
  data: WP_REST_API_Post
  getDetail: (params: number) => void
} => {
  const dispatch = useDispatch()
  const metaDetail = useSelector(getPostsMeta)
  const data = useSelector(selectors.detail)
  const getDetail = (params: number) => {
    dispatch(actions.initDetail(params))
  }

  return { metaDetail, getDetail, data }
}

export default useDetail
