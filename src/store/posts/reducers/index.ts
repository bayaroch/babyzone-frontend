import { createReducer } from '@reduxjs/toolkit'
import { PostItem } from '../actions/types'
import * as actions from '../actions'
import { PageMeta } from '@services/post.services'
import _ from 'lodash'

export type PostState = {
  postList: PostItem[] | undefined
  postListMeta?: PageMeta | undefined
}

const initialState: PostState = {
  postList: undefined,
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getAllPosts.fulfilled, (state, action) => {
    state.postList = action.payload
    state.postListMeta = {
      page: action.meta.arg.page,
      per_page: action.meta.arg.per_page,
    }
  })
  builder.addCase(actions.clearMatchData, (state) => {
    state.postList = undefined
    state.postListMeta = undefined
  })
})
