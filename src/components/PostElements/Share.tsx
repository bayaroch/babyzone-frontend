import React from 'react'
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
  const url = typeof window !== 'undefined' ? window.location.href : ''

  if (!url) return null

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
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} />
          <FacebookShareCount url={url} />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
      </Box>
    </Box>
  )
}

export default Share
