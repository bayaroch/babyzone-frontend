import { postServices, PageMeta } from '@services/post.services'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { POST_ACTION_TYPE, CLEAR_POST_DATA } from './types'

import type { WP_REST_API_Posts } from 'wp-types'

export const getAllPosts = createAsyncThunk<WP_REST_API_Posts, PageMeta>(
  POST_ACTION_TYPE.GET_MATCHES,
  async (matchParams, { rejectWithValue }) => {
    try {
      const res = await postServices.getAllPosts(
        matchParams,
        'id,content,date,title,excerpt,_links.wp:featuredmedia,_embedded.wp:featuredmedia'
      )
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)

export const clearMatchData = createAction(CLEAR_POST_DATA)
