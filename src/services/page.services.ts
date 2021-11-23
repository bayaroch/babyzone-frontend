import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

export type PageMeta = {
  page: number
  per_page: number
  total_page: number
}

export type PageMetaParams = {
  page: number
  per_page: number
}

export const pageServices = {
  page: async (slug?: string): Promise<WP_REST_API_Post> => {
    const { data } = await api.get<WP_REST_API_Post>(`${URI.PAGE}?slug=${slug}`)
    return data
  },
  pages: async (): Promise<WP_REST_API_Posts> => {
    const { data } = await api.get<WP_REST_API_Posts>(
      `${URI.PAGE}?page=1&per_page=20`
    )
    return data
  },
}
