import Box from '@mui/material/Box'

import { Avatar, BoxProps, Typography } from '@mui/material'

interface AuthorProps extends BoxProps {
  author: {
    name: string
    link: string
    // img?: string
  }
}

const Author: React.FC<AuthorProps> = ({ author, ...rest }) => {
  return (
    <Box className="author" {...rest}>
      <Box
        flexDirection={'row'}
        sx={{ mt: { lg: 2, md: 2, sm: 0, xs: 0 } }}
        display="flex"
        justifyContent={'flex-start'}
      >
        <a
          href={author.link}
          style={{ textDecoration: 'none', paddingRight: 10 }}
          rel="author"
        >
          <Avatar
            sx={{
              background: (theme) => theme.palette.primary.main,
              width: '40px',
              height: '40px',
              color: '#fff',
            }}
          >
            {author.name ? author.name.toUpperCase().charAt(0) : ''}
          </Avatar>
        </a>
        <Box>
          <span style={{ display: 'block', color: '#888', fontSize: 12 }}>
            Нийтэлсэн:
          </span>
          <Typography
            component="a"
            variant="body1"
            href={author?.link}
            style={{ textDecoration: 'none' }}
            rel="author"
            sx={{ color: '#333', fontSize: 14, fontWeight: 600 }}
          >
            {author.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Author
