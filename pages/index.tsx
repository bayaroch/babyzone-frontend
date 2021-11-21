/*
 * Homepage
 */

import PageWithLayoutType from '@constants/page'
import MainLayout from '@components/Layouts/MainLayout'
import { Container, Grid } from '@mui/material'
import PostList from '@containers/PostList'
import CategoryMenu from '@containers/CategoryMenu'

const HomePage: PageWithLayoutType = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: {
          xs: '0',
          sm: '0',
        },
      }}
    >
      <Grid container columnSpacing={{ xs: 0 }}>
        <Grid item xs={12} md={8}>
          <PostList />
        </Grid>
        <Grid md={4} item>
          <CategoryMenu />
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage

HomePage.Layout = MainLayout
