import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Posts } from 'wp-types'

export type PageMeta = {
  page: number
  per_page: number
}

export const postServices = {
  getAllPosts: async (
    meta?: PageMeta,
    fields?: string // https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
  ): Promise<WP_REST_API_Posts> => {
    const { data } = await api.get<WP_REST_API_Posts>(
      `${URI.ALL_POSTS}?_embed&page=${meta && meta.page}&per_page=${
        meta && meta.per_page
      }&_fields=${fields}`
    )

    return data
  },
}
