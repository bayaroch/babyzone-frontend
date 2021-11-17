import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface MediaCardProps {
  title: string
  date?: string
  desc?: string
  media?: string | undefined
  author?: {
    name?: string
    avatar?: string
  }
  slug: string
}

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { title, date, desc, media, author, slug } = props
  return (
    <Card sx={{ maxWidth: '100%', marginBottom: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={date}
      />
      {media ? (
        <CardMedia
          component="img"
          height="auto"
          image={media}
          alt="Paella dish"
        />
      ) : (
        ''
      )}

      <CardContent>
        <h3>{title}</h3>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default MediaCard

MediaCard.defaultProps = {
  media: 'https://mui.com/static/images/cards/paella.jpg',
}
