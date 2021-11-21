import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import HTMLParser from '@components/HtmlParser'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CardActions from '@mui/material/CardActions'
import { Box, Button } from '@mui/material'
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
  onLoad?: () => void
}

const MediaCard: React.FC<MediaCardProps> = (props) => {
  const { title, date, desc, media, id, term } = props
  const router = useRouter()
  const time = date ? CommonHelper.staticSmartTime(date) : ''
  return (
    <Card
      sx={{
        maxWidth: '100%',
        marginBottom: {
          lg: '30px',
          sx: '20px',
          xs: '20px',
        },
        borderRadius: {
          lg: '4px',
          xs: '0',
        },
      }}
    >
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
      <Box position={'relative'} pt="100%">
        <Box
          height={'100%'}
          width={'100%'}
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={media}
          />
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          {desc && <HTMLParser html={desc} />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => id && router.push(`/p/${id}`)}>
          Дэлгэрэнгүй
        </Button>
      </CardActions>
    </Card>
  )
}

export default MediaCard
