import Box from '@mui/material/Box'
import { BoxProps } from '@mui/material'
import StepCard from './StepCard'

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
          <StepCard step={step} index={index} key={index} />
        ))}
    </Box>
  )
}

export default Steps
