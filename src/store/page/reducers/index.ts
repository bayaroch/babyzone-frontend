import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { PageMeta } from '@services/page.services'
import { WP_REST_API_Posts } from 'wp-types'

export type PageState = {
  pageList: WP_REST_API_Posts | undefined
  pageMeta?: PageMeta | undefined
}

const initialState: PageState = {
  pageList: undefined,
  pageMeta: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.pages.fulfilled, (state, action) => {
    state.pageList = action.payload
  })
  builder.addCase(actions.clearPageData, (state) => {
    state.pageList = undefined
  })
})
