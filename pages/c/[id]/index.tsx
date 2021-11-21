/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import { Container, Grid } from '@mui/material'
import PostList from '@containers/PostList'
import CategoryMenu from '@containers/CategoryMenu'

const Category: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  // eslint-disable-next-line no-console
  console.log(id)
  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Grid container columnSpacing={{ xs: 0 }}>
          <Grid item xs={12} md={8}>
            {id && <PostList category={Number(id)} />}
          </Grid>
          <Grid md={4} item>
            <CategoryMenu category={Number(id)} />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default Category
