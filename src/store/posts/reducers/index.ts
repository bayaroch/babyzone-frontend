import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { PageMeta } from '@services/post.services'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import _ from 'lodash'
import { Related_Post } from '@components/PostElements/RelatedPosts'

export type PostState = {
  postList: WP_REST_API_Posts | undefined
  postListMeta?: PageMeta | undefined
  relatedPost: Related_Post[] | undefined
  detail: WP_REST_API_Post | undefined
}

const initialState: PostState = {
  postList: undefined,
  relatedPost: undefined,
  detail: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getAllPosts.fulfilled, (state, action) => {
    state.postList = _.unionBy(state.postList, action.payload.data, 'id')
    state.postListMeta = {
      page: action.meta.arg.page,
      per_page: action.meta.arg.per_page,
      total_page: action.payload.headers,
    }
  })
  builder.addCase(actions.clearPostData, (state) => {
    state.postList = undefined
    state.postListMeta = undefined
  })
  builder.addCase(actions.clearDetailData, (state) => {
    state.detail = undefined
  })
  builder.addCase(actions.detail.fulfilled, (state, action) => {
    state.detail = action.payload
  })
  builder.addCase(actions.getRelatedPosts.fulfilled, (state, action) => {
    state.relatedPost = action.payload
  })
})
