import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/taxonomy'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'

import { WP_REST_API_Tags } from 'wp-types'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.getTagsById)

const useTags = (): {
  meta: Meta
  tags: WP_REST_API_Tags
  tagList: (params: number) => void
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPostsMeta)
  const tags = useSelector(selectors.postTags)
  const tagList = (params: number) => {
    dispatch(actions.getTagsById(params))
  }

  return { meta, tagList, tags }
}

export default useTags
