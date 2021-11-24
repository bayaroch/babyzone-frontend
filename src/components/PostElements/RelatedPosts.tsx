import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import { Box, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import Link from 'next/link'

export interface Related_Post {
  ID: number
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  featured_image: string
  category: string
  featured_image_small: string // 200x200
}

export interface RelatedPostsProps {
  data: Related_Post[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ data }) => {
  return (
    <ImageList
      sx={{
        width: '100%',
        height: 'auto',
        paddingBottom: '10px',
        gridTemplateColumns: {
          lg: 'repeat(2, 1fr) !important',
          xs: 'repeat(1, 1fr)!important',
        },
      }}
      gap={10}
      cols={2}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            position: 'relative',
            paddingRight: '110px',
            borderRadius: 1,
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'block', width: '100%' }}>
            <CardContent sx={{ flex: '1' }}>
              <Typography
                component="div"
                noWrap
                sx={{ fontSize: 14 }}
                variant="h3"
              >
                {item.post_title}
              </Typography>
              <Typography
                component="div"
                sx={{ fontSize: 12, color: '#aaa' }}
                variant="body2"
              >
                {CommonHelper.staticSmartTime(item.post_date)}
              </Typography>
            </CardContent>
          </Box>
          <Link href={`/p/${item.ID}`}>
            <CardMedia
              component="img"
              sx={{
                width: 100,
                height: 100,
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
              }}
              image={item.featured_image_small}
              alt="Live from space album cover"
            />
          </Link>
        </Card>
      ))}
    </ImageList>
  )
}

export default RelatedPosts
