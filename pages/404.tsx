import { NextPage } from 'next'
import { Container, Link, Typography } from '@mui/material'

const NotFound: NextPage = () => {
  return (
    <Container>
      <Typography>{'Хуудас Олдсонгүй'}</Typography>
      <Link href="/">{'Буцах'}</Link>
    </Container>
  )
}

export default NotFound
