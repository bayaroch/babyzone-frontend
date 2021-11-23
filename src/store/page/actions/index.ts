import { pageServices } from '@services/page.services'
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { PAGE_ACTION_TYPE, CLEAR_PAGE_DATA } from './types'
import type { WP_REST_API_Posts } from 'wp-types'

export const pages = createAsyncThunk<WP_REST_API_Posts>(
  PAGE_ACTION_TYPE.PAGE,
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

export const initPages = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (dispatch: any) => {
    Promise.resolve(dispatch(clearPageData())).then(() => dispatch(pages()))
  }
}

export const clearPageData = createAction(CLEAR_PAGE_DATA)
