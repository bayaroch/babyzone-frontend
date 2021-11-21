import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Posts } from 'wp-types'

export type PageMeta = {
  page: number
  per_page: number
  total_page: number
}

export type PageMetaParams = {
  page: number
  per_page: number
}

export const postServices = {
  getAllPosts: async (
    meta?: PageMetaParams,
    fields?: string // https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
  ): Promise<{ data: WP_REST_API_Posts; headers: number }> => {
    const { data, headers } = await api.get<WP_REST_API_Posts>(
      `${URI.ALL_POSTS}?_embed&page=${meta && meta.page}&per_page=${
        meta && meta.per_page
      }&_fields=${fields}`
    )

    return { data, headers: headers['x-wp-total'] }
  },
}
