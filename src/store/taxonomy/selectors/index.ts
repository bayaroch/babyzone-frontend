import { createSelector } from 'reselect'
import { RootState } from '@store/reducers'

const getState = (state: RootState) => state.taxonomy

export const categories = createSelector(getState, (state) => state.categories)
