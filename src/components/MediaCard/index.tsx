import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import HTMLParser from '@components/HtmlParser'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CardActions from '@mui/material/CardActions'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

interface MediaCardProps {
  title: string
  date?: string
  desc?: string
  media?: string | undefined
  author?: {
    name?: string
    avatar?: string
  }
  id: number
  term?: string
}

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { title, date, desc, media, id, term } = props
  const router = useRouter()
  const time = date ? CommonHelper.staticSmartTime(date) : ''
  return (
    <Card sx={{ maxWidth: '100%', marginBottom: 10 }}>
      <CardHeader
        avatar={
          <Stack direction="row" spacing={1}>
            {term && <Chip label={term} size="small" color={'primary'} />}
          </Stack>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={time}
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
        <Typography variant="body2" component="div" color="text.secondary">
          {desc && <HTMLParser html={desc} />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => id && router.push(`p/${id}`)}>
          Дэлгэрэнгүй
        </Button>
      </CardActions>
    </Card>
  )
}

export default MediaCard

MediaCard.defaultProps = {
  media: 'https://mui.com/static/images/cards/paella.jpg',
}
