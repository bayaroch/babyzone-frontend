import { taxonomyServices } from '@services/taxonomy.services'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TAXONOMY_ACTION_TYPE } from './types'
import type { WP_REST_API_Categories } from 'wp-types'

export const getAllCategories = createAsyncThunk<WP_REST_API_Categories>(
  TAXONOMY_ACTION_TYPE.GET_CATEGORIES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await taxonomyServices.getAllCategories()
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)
