import { postServices, PageMetaParams } from '@services/post.services'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { POST_ACTION_TYPE, CLEAR_POST_DATA, CLEAR_DETAIL_DATA } from './types'
import type { WP_REST_API_Posts, WP_REST_API_Post } from 'wp-types'
import { Related_Post } from '@components/PostElements/RelatedPosts'

export interface PostParams extends PageMetaParams {
  category: number | undefined
  tag: number | undefined
}

export const getAllPosts = createAsyncThunk<
  { data: WP_REST_API_Posts; headers: number },
  PostParams
>(POST_ACTION_TYPE.GET_POSTS, async (params, { rejectWithValue }) => {
  try {
    const res = await postServices.getAllPosts(
      params,
      `id,content,date,acf,slug,tags,title,excerpt,_links.wp:featuredmedia,_links.author,_links.wp:term,_embedded${
        params.category ? `&categories=${params.category}` : ''
      }${params.tag ? `&tags=${params.tag}` : ''}`
    )
    return res
  } catch (error) {
    if (!error) {
      throw error
    }
    return rejectWithValue(error)
  }
})

export const initPosts = (params: PostParams) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any) => {
    Promise.resolve(dispatch(clearPostData())).then(() =>
      dispatch(getAllPosts(params))
    )
  }
}

export const getRelatedPosts = createAsyncThunk<Related_Post[], number>(
  POST_ACTION_TYPE.RELATED_POSTS,
  async (params, { rejectWithValue }) => {
    try {
      const res = await postServices.relatedPosts(params)
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)

export const detail = createAsyncThunk<WP_REST_API_Post, number>(
  POST_ACTION_TYPE.POST_DETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const res = await postServices.postDetail(params)
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)

export const initDetail = (params: number) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any) => {
    Promise.resolve(dispatch(clearDetailData())).then(() =>
      dispatch(detail(params))
    )
  }
}

export const initRelatedPosts = (params: number) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any) => {
    Promise.resolve(dispatch(clearPostData())).then(() =>
      dispatch(getRelatedPosts(params))
    )
  }
}

export const clearPostData = createAction(CLEAR_POST_DATA)
export const clearDetailData = createAction(CLEAR_DETAIL_DATA)
