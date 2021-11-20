import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Categories } from 'wp-types'

export const taxonomyServices = {
  getAllCategories: async (): Promise<WP_REST_API_Categories> => {
    const { data } = await api.get<WP_REST_API_Categories>(URI.CATEGORIES)
    return data
  },
}
