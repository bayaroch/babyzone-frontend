import { pageServices } from '@services/page.services'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { PAGE_ACTION_TYPE, CLEAR_PAGE_DATA } from './types'
import type { WP_REST_API_Posts } from 'wp-types'

export const pages = createAsyncThunk<WP_REST_API_Posts>(
  PAGE_ACTION_TYPE.PAGES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await pageServices.pages()
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)

export const pageById = createAsyncThunk<WP_REST_API_Posts, string>(
  PAGE_ACTION_TYPE.PAGE,
  async (params, { rejectWithValue }) => {
    try {
      const res = await pageServices.page(params)
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)

export const initPage = (slug: string) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any) => {
    Promise.resolve(dispatch(clearPageData())).then(() =>
      dispatch(pageById(slug))
    )
  }
}

export const clearPageData = createAction(CLEAR_PAGE_DATA)
