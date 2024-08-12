import { useQuery, UseQueryResult, QueryStatus } from 'react-query'
import { taxonomyServices } from '@services/taxonomy.services'
import { WP_REST_API_Categories } from 'wp-types'

interface UseCategoriesReturn {
  cats: WP_REST_API_Categories
  getList: () => void
  meta: {
    status: QueryStatus
    error: Error | null
  }
}

const useCategories = (): UseCategoriesReturn => {
  const fetchCategories = async (): Promise<WP_REST_API_Categories> => {
    return taxonomyServices.getAllCategories()
  }

  const {
    data,
    status,
    error,
    refetch,
  }: UseQueryResult<WP_REST_API_Categories, Error> = useQuery(
    'categories',
    fetchCategories,
    {
      enabled: false, // This prevents the query from running automatically
    }
  )

  const getList = () => {
    refetch()
  }

  return {
    cats: data || [],
    getList,
    meta: { status, error },
  }
}

export default useCategories
