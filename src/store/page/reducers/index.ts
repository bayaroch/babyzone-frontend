import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { PageMeta } from '@services/page.services'
import { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types'
import _ from 'lodash'

export type PageState = {
  pageList: WP_REST_API_Posts | undefined
  pageMeta?: PageMeta | undefined
  pageDetail: WP_REST_API_Post | undefined
}

const initialState: PageState = {
  pageList: undefined,
  pageMeta: undefined,
  pageDetail: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.pages.fulfilled, (state, action) => {
    state.pageList = action.payload
  })
  builder.addCase(actions.pageById.fulfilled, (state, action) => {
    if (!_.isEmpty(action.payload)) {
      state.pageDetail = action.payload[0]
    }
  })
  builder.addCase(actions.clearPageData, (state) => {
    state.pageDetail = undefined
  })
})
