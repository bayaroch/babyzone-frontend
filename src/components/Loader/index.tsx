import Box from '@mui/material/Box'
import { BoxProps } from '@mui/material'

interface LoaderProps extends BoxProps {
  color?: 'white' | 'regular'
}

const Loader: React.FC<LoaderProps> = ({ color, ...rest }) => {
  return (
    <Box {...rest}>
      <img
        src={
          color === 'white' ? '/images/loader-white.gif' : '/images/loader.gif'
        }
      />
    </Box>
  )
}

export default Loader

Loader.defaultProps = {
  color: 'regular',
}
