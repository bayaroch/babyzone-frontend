import api from './api'
import { URI } from '@constants/uri.constants'

export type MatchPageMeta = {
  page: number
  per_page: number
}

export const matchServices = {
  getAllPosts: async (meta: MatchPageMeta): Promise<any> => {
    const { data } = await api.get<any>(
      `${URI.MATCH}?page=${meta.page}&per_page=${meta.per_page}`
    )
    return data
  },
}
