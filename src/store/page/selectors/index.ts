import { createSelector } from 'reselect'
import { RootState } from '@store/reducers'

const getState = (state: RootState) => state.page

export const pageDetail = createSelector(getState, (state) => state.pageDetail)
