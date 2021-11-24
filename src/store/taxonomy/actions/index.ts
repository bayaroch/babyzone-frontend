import { taxonomyServices } from '@services/taxonomy.services'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TAXONOMY_ACTION_TYPE } from './types'
import { WP_REST_API_Categories, WP_REST_API_Tags } from 'wp-types'

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

export const getTagsById = createAsyncThunk<WP_REST_API_Tags, number>(
  TAXONOMY_ACTION_TYPE.GET_TAGS_BY_ID,
  async (id, { rejectWithValue }) => {
    try {
      const res = await taxonomyServices.getTagsById(id)
      return res
    } catch (error) {
      if (!error) {
        throw error
      }
      return rejectWithValue(error)
    }
  }
)
