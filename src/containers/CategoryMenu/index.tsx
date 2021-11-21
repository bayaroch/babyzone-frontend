import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
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
          <Typography
            align="center"
            sx={{ fontSize: 11, color: '#aaa' }}
            variant="body2"
          >
            © 2021 Babyzone.mn
          </Typography>
        </>
      ) : null}
    </Box>
  )
}

export default CategoryMenu
