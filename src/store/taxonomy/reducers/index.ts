import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { WP_REST_API_Categories } from 'wp-types'

export type TaxonomyState = {
  categories: WP_REST_API_Categories | undefined
}

const initialState: TaxonomyState = {
  categories: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getAllCategories.fulfilled, (state, action) => {
    state.categories = action.payload
  })
})
