import {
  useQuery,
  useQueryClient,
  UseQueryResult,
  QueryStatus,
} from 'react-query'
import { postServices } from '@services/post.services'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'

export interface PostParams {
  page: number
  per_page: number
  category?: number
  tag?: number
}

interface UseCustomPostsReturn {
  meta: {
    status: QueryStatus
    error: Error | null
  }
  list: WP_REST_API_Post[]
  getPregnancyList: (params: PostParams) => void
}

const useCustomPosts = (): UseCustomPostsReturn => {
  const queryClient = useQueryClient()

  const fetchPregnancyPosts = async (
    params: PostParams
  ): Promise<{ data: WP_REST_API_Posts; headers: number }> => {
    return postServices.getAllPregnancy(params)
  }

  const {
    data,
    status,
    error,
    refetch,
  }: UseQueryResult<
    { data: WP_REST_API_Posts; headers: number },
    Error
  > = useQuery(
    ['pregnancyPosts'],
    () => fetchPregnancyPosts({ page: 1, per_page: 10 }),
    {
      enabled: false, // This prevents the query from running automatically
    }
  )

  const getPregnancyList = (params: PostParams) => {
    queryClient.setQueryData(['pregnancyPosts'], undefined)
    refetch({ queryKey: ['pregnancyPosts', params] })
  }

  return {
    meta: { status, error },
    list: data?.data || [],
    getPregnancyList,
  }
}

export default useCustomPosts
