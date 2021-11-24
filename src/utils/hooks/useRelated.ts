import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/posts'
import { Meta } from '@store/metadata/actions/types'
import { useDispatch, useSelector } from 'react-redux'
import { Related_Post } from '@components/PostElements/RelatedPosts'

const { selectors, actions } = searchStore
const getPostsMeta = createMetaSelector(actions.getRelatedPosts)

const useRelated = (): {
  meta: Meta
  list: Related_Post[]
  relatedList: (params: number) => void
} => {
  const dispatch = useDispatch()
  const meta = useSelector(getPostsMeta)
  const list = useSelector(selectors.relatedPosts)
  const relatedList = (params: number) => {
    dispatch(actions.initRelatedPosts(params))
  }

  return { meta, relatedList, list }
}

export default useRelated
