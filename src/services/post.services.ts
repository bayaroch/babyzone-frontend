import api from './api'
import { URI } from '@constants/uri.constants'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import { Related_Post } from '@components/PostElements/RelatedPosts'

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

  getAllPregnancy: async (
    meta?: PageMetaParams,
    fields?: string // https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
  ): Promise<{ data: WP_REST_API_Posts; headers: number }> => {
    const { data, headers } = await api.get<WP_REST_API_Posts>(
      `${URI.PREGNANCY}?_embed&page=${meta && meta.page}&per_page=${
        meta && meta.per_page
      }&_fields=${fields}`
    )

    return { data, headers: headers['x-wp-total'] }
  },

  getAllBaby: async (
    meta?: PageMetaParams,
    fields?: string // https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
  ): Promise<{ data: WP_REST_API_Posts; headers: number }> => {
    const { data, headers } = await api.get<WP_REST_API_Posts>(
      `${URI.BABY}?_embed&page=${meta && meta.page}&per_page=${
        meta && meta.per_page
      }&_fields=${fields}`
    )

    return { data, headers: headers['x-wp-total'] }
  },

  relatedPosts: async (post_id: number): Promise<Related_Post[]> => {
    const { data } = await api.get<Related_Post[]>(
      URI.RELATED_POSTS.replace(/:id/gi, post_id.toString())
    )
    return data
  },

  postDetail: async (post_id: number): Promise<WP_REST_API_Post> => {
    const { data } = await api.get<WP_REST_API_Post>(
      `${URI.ALL_POSTS}?include[]=${post_id}&_embed`
    )
    return data
  },

  postPregnancyDetail: async (post_id: number): Promise<WP_REST_API_Posts> => {
    const { data } = await api.get<WP_REST_API_Posts>(
      `${URI.PREGNANCY}?include[]=${post_id}&_embed`
    )
    return data
  },

  postBabyDetail: async (post_id: number): Promise<WP_REST_API_Posts> => {
    const { data } = await api.get<WP_REST_API_Posts>(
      `${URI.BABY}?include[]=${post_id}&_embed`
    )
    return data
  },
}
