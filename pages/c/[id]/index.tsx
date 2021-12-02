/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import { Container, Grid } from '@mui/material'
import CategoryMenu from '@containers/CategoryMenu'
import PostListByCategory from '@containers/PostListbyCategory'
import Seo from '@components/Seo'
import { WEB } from '@constants/uri.constants'

const Category: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <MainLayout>
      <Seo
        title={'babyzone.mn'}
        description={
          'Шинэ ээж аавуудад, эмэгтэйчүүдэд жирэмслэлт, төрөлт, өсгөн хүмүүжүүлэх тал дээр хэрэгцээтэй мэдээллээр ханган туслах зорилготой.'
        }
        image={`${WEB}/images/default.png`}
      />
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
            {id && <PostListByCategory category={Number(id)} />}
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
