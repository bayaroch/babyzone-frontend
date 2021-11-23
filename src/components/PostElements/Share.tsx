import Box from '@mui/material/Box'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  FacebookShareCount,
} from 'react-share'
import { BoxProps } from '@mui/material'

const Share: React.FC<BoxProps> = ({ ...rest }) => {
  return (
    <Box className="author" {...rest}>
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        width={70}
        display={'flex'}
        sx={{
          marginTop: {
            lg: 4,
            sm: 0,
          },
        }}
      >
        <FacebookShareButton url={window && window.location.href}>
          <FacebookIcon size={32} />
          <FacebookShareCount url={window && window.location.href} />
        </FacebookShareButton>
        <TwitterShareButton url={window && window.location.href}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </Box>
    </Box>
  )
}

export default Share
