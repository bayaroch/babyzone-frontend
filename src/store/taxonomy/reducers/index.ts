import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { WP_REST_API_Categories, WP_REST_API_Tags } from 'wp-types'

export type TaxonomyState = {
  categories: WP_REST_API_Categories | undefined
  postTags: WP_REST_API_Tags | undefined
}

const initialState: TaxonomyState = {
  categories: undefined,
  postTags: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getAllCategories.fulfilled, (state, action) => {
    state.categories = action.payload
  })
  builder.addCase(actions.getTagsById.fulfilled, (state, action) => {
    state.postTags = action.payload
  })
})
