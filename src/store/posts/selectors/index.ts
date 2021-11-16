import { createSelector } from 'reselect'
import { RootState } from '@store/reducers'
import _ from 'lodash'

const getState = (state: RootState) => state.posts

export const matches = createSelector(getState, (state) => state.postList)

export const paginationMeta = createSelector(
  getState,
  (state) => state.postListMeta
)
