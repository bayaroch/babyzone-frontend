import React from 'react'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import CategoryList from '@components/CategoryList'
import { useRouter } from 'next/router'
import { taxonomyServices } from '@services/taxonomy.services'
import { WP_REST_API_Categories } from 'wp-types'

interface MenuProps {
  category?: number | undefined
}

const CategoryMenu: React.FC<MenuProps> = ({ category }) => {
  const router = useRouter()

  const { data: cats, refetch } = useQuery<WP_REST_API_Categories, Error>(
    'categories',
    () => taxonomyServices.getAllCategories(),
    {
      enabled: false, // This prevents the query from running automatically
    }
  )

  React.useEffect(() => {
    refetch()
  }, [refetch])

  const onPress = (id: number) => {
    router.push(`/c/${id.toString()}`, undefined, { shallow: false })
  }

  return (
    <Box
      style={{
        position: 'fixed',
        top: 100,
        marginLeft: 30,
      }}
    >
      {cats && cats.length > 0 && (
        <CategoryList category={category} data={cats} onPress={onPress} />
      )}
    </Box>
  )
}

export default CategoryMenu
