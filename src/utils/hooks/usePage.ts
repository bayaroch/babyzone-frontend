import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/page'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { WP_REST_API_Post } from 'wp-types'

const { selectors, actions } = searchStore
const getPageMeta = createMetaSelector(actions.pageById)

const usePage = (): {
  meta: Meta
  detail: WP_REST_API_Post
  initPage: (params: string) => void
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPageMeta)
  const detail = useSelector(selectors.pageDetail)
  const initPage = (params: string) => {
    dispatch(actions.initPage(params))
  }
  return {
    meta,
    initPage,
    detail,
  }
}

export default usePage
