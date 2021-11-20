import { createMetaSelector } from '@store/metadata/selectors'
import searchStore from '@store/taxonomy'
import { useDispatch, useSelector } from 'react-redux'
import { WP_REST_API_Categories } from 'wp-types'
import { Meta } from '@store/metadata/actions/types'

const { selectors, actions } = searchStore
const catsMeta = createMetaSelector(actions.getAllCategories)

const useCategories = (): {
  cats: WP_REST_API_Categories
  getList: () => void
  meta: Meta
} => {
  const dispatch = useDispatch()
  const meta = useSelector(catsMeta)
  const cats = useSelector(selectors.categories)
  const getList = () => dispatch(actions.getAllCategories())

  return { cats, getList, meta }
}

export default useCategories
