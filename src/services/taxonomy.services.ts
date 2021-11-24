import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Categories, WP_REST_API_Tags } from 'wp-types'

export const taxonomyServices = {
  getAllCategories: async (): Promise<WP_REST_API_Categories> => {
    const { data } = await api.get<WP_REST_API_Categories>(URI.CATEGORIES)
    return data
  },
  getTagsById: async (id: number): Promise<WP_REST_API_Tags> => {
    const { data } = await api.get<WP_REST_API_Tags>(`${URI.TAGS}?post=${id}`)
    return data
  },
}
