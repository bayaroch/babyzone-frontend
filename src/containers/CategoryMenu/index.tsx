import { useEffect } from 'react'
import { Box } from '@mui/material'
import useCategories from '@utils/hooks/useCategories'
import CategoryList from '@components/CategoryList'
import { useRouter } from 'next/router'

interface MenuProps {
  category?: number | undefined
}

const CategoryMenu: React.FC<MenuProps> = ({ category }) => {
  const { getList, cats } = useCategories()
  const router = useRouter()

  useEffect(() => {
    getList()
  }, [])

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
      {' '}
      {cats ? (
        <>
          <CategoryList category={category} data={cats} onPress={onPress} />
        </>
      ) : null}
    </Box>
  )
}

export default CategoryMenu
