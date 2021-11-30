import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import _ from 'lodash'
import { toPng } from 'html-to-image'
import { useRef, useCallback } from 'react'
import { ImageOutlined } from '@mui/icons-material'

export interface StepItemType {
  image: string
  stepDesc: string
  stepTitle: string
}

export interface CardProps {
  step: StepItemType
  index: number
}

const StepCard: React.FC<CardProps> = ({ step, index, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toPng(ref.current, {})
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `image-${index + 1}`
        link.href = dataUrl
        link.click()
      })
      .catch((_) => null)
  }, [ref])

  return (
    <Card ref={ref} sx={{ maxWidth: '100%', marginBottom: 2 }} {...rest}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          sx={{
            background: (theme) => theme.palette.primary.main,
            position: 'absolute',
            left: 10,
            top: 10,
            boxShadow: 1,
            width: 30,
            height: 30,
          }}
        >
          <Typography variant="h3">{index + 1}</Typography>
        </Avatar>
        <ImageOutlined
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            width: 30,
            color: '#fff',
            opacity: 0.7,
            height: 30,
          }}
          onClick={() => onButtonClick()}
        />
        <CardMedia
          component="img"
          height="194"
          image={step.image}
          alt="Paella dish"
        />
      </Box>
      <CardContent>
        {!_.isEmpty(step.stepTitle) && (
          <Typography
            variant="h3"
            sx={{ fontWeight: 600, color: '#333', mb: 1 }}
            color="text.secondary"
          >
            {step.stepTitle}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          {step.stepDesc}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StepCard
