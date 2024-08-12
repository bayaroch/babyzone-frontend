import {
  useQuery,
  useQueryClient,
  UseQueryResult,
  QueryStatus,
} from 'react-query'
import { pageServices } from '@services/page.services'
import { WP_REST_API_Post } from 'wp-types'

interface UsePageReturn {
  meta: {
    status: QueryStatus
    error: Error | null
  }
  detail: WP_REST_API_Post | undefined
  initPage: (slug: string) => void
}

const usePage = (): UsePageReturn => {
  const queryClient = useQueryClient()

  const fetchPage = async (
    slug: string
  ): Promise<WP_REST_API_Post | undefined> => {
    const data = await pageServices.page(slug)
    return data[0] // Assuming we want the first page if multiple are returned
  }

  const {
    data,
    status,
    error,
    refetch,
  }: UseQueryResult<WP_REST_API_Post | undefined, Error> = useQuery(
    ['page'],
    () => fetchPage(''), // Initial fetch with an empty slug
    {
      enabled: false, // This prevents the query from running automatically
    }
  )

  const initPage = (slug: string) => {
    queryClient.setQueryData(['page'], undefined)
    refetch({ queryKey: ['page', slug] })
  }

  return {
    meta: { status, error },
    detail: data,
    initPage,
  }
}

export default usePage
