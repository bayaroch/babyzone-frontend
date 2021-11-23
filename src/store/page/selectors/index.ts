import { createSelector } from 'reselect'
import { RootState } from '@store/reducers'

const getState = (state: RootState) => state.page

export const pageDetail = createSelector(getState, (state) => state.page)

export const paginationMeta = createSelector(
  getState,
  (state) => state.pageMeta
)
