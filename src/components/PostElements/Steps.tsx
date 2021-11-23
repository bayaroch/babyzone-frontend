import Box from '@mui/material/Box'
import { BoxProps } from '@mui/material'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import _ from 'lodash'

export interface StepItemType {
  image: string
  stepDesc: string
  stepTitle: string
}

interface StepProps extends BoxProps {
  steps: StepItemType[]
}

const Steps: React.FC<StepProps> = ({ steps, ...rest }) => {
  return (
    <Box {...rest}>
      {steps &&
        steps.map((step, index) => (
          <Card key={index} sx={{ maxWidth: '100%', marginBottom: 2 }}>
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
        ))}
    </Box>
  )
}

export default Steps
