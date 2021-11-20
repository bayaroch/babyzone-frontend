import { createSelector } from 'reselect'
import { RootState } from '@store/reducers'

const getState = (state: RootState) => state.posts

export const posts = createSelector(getState, (state) => state.postList)

export const paginationMeta = createSelector(
  getState,
  (state) => state.postListMeta
)
