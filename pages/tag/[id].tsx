/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import { Chip, Container, Grid, Typography } from '@mui/material'
import PostList from '@containers/PostList'
import CategoryMenu from '@containers/CategoryMenu'
import { Tag as TagIcon } from '@mui/icons-material'
import Seo from '@components/Seo'

const Tag: PageWithLayoutType = () => {
  const router = useRouter()
  const { id, name } = router.query
  // eslint-disable-next-line no-console
  return (
    <MainLayout>
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: '0',
            sm: '0',
          },
        }}
      >
        <Seo
          title={'babyzone.mn'}
          description={
            'Шинэ ээж аавуудад, эмэгтэйчүүдэд жирэмслэлт, төрөлт, өсгөн хүмүүжүүлэх тал дээр хэрэгцээтэй мэдээллээр ханган туслах зорилготой.'
          }
          image={`https://www.babyzone.mn/images/babyzone.jpg`}
        />
        <Grid container columnSpacing={{ xs: 0 }}>
          <Grid item xs={12} md={8}>
            {name && (
              <Typography variant="h3" sx={{ paddingLeft: '10px', mb: 1 }}>
                Шүүлт:
                <Chip
                  sx={{ ml: 1 }}
                  icon={<TagIcon sx={{ fontSize: 12 }} />}
                  label={name}
                  color="primary"
                  variant="outlined"
                />
              </Typography>
            )}

            {id && <PostList tag={Number(id)} />}
          </Grid>
          <Grid md={4} item>
            <CategoryMenu />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default Tag
