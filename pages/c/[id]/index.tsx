/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Category: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  // eslint-disable-next-line no-console
  return (
    <MainLayout>
      <Typography sx={{ display: 'none' }}>{id}</Typography>
    </MainLayout>
  )
}

export default Category
