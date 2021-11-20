import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import useCategories from '@utils/hooks/useCategories'
import CategoryList from '@components/CategoryList'
import { useRouter } from 'next/router'

const CategoryMenu: React.FC = () => {
  const { getList, cats } = useCategories()
  const router = useRouter()

  useEffect(() => {
    getList()
  }, [])

  const onPress = (id: number) => {
    router.push(`c/${id}`)
  }

  return (
    <Box
      style={{
        position: 'fixed',
        top: 100,
        marginLeft: 30,
      }}
    >
      <CategoryList data={cats} onPress={onPress} />
      <Typography
        align="center"
        sx={{ fontSize: 11, color: '#aaa' }}
        variant="body2"
      >
        © 2021 Babyzone.mn
      </Typography>
    </Box>
  )
}

export default CategoryMenu
