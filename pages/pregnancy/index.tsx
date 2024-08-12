/*
 * Detail Page
 */
import MainLayout from '@components/Layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { Box, Container } from '@mui/material'
import Seo from '@components/Seo'
import useCustomPosts from '@utils/hooks/useCustomPosts'
import { useEffect } from 'react'
import { WP_REST_API_Post } from 'wp-types'

const Pregnancy: PageWithLayoutType = () => {
  // const [av, setAv] = useState<string>('01')

  const { list, getPregnancyList } = useCustomPosts()

  useEffect(() => {
    getPregnancyList({
      per_page: 100,
      page: 1,
      category: undefined,
      tag: undefined,
    })
    //
  }, [])
  // eslint-disable-next-line no-console
  console.log('aaa', list)

  return (
    <MainLayout>
      <Seo title="asdasd" description="asdas" image="images/gender_chart.jpg" />
      <Container
        maxWidth="lg"
        sx={{
          padding: {
            xs: '0',
            sm: '0',
          },
        }}
      >
        <Box>
          asdasd
          {list &&
            list?.map((p: WP_REST_API_Post, index: number) => {
              return <Box key={index}>{p.title.rendered}</Box>
            })}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Pregnancy
