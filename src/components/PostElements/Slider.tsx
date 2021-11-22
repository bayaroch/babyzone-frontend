import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade, Pagination, Autoplay } from 'swiper'
// import { css } from '@emotion/css'
import { Box, BoxProps } from '@mui/material'

export interface ACFImage {
  id: number
  name: string
  sizes: {
    'large-height': number
    'large-width': number
    large: string
  }
  height: number
  width: number
  url: string
  caption: string
}

interface SliderProps extends BoxProps {
  images?: ACFImage[]
}

SwiperCore.use([EffectFade, Pagination, Autoplay])

const Slider: React.FC<SliderProps> = ({ images, ...rest }) => {
  return (
    <Box {...rest}>
      <Swiper
        effect="fade"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {!!images &&
          images.map((img) => {
            return (
              <SwiperSlide key={img.id}>
                <img
                  height={img.sizes['large-height']}
                  width={img.sizes['large-height']}
                  src={img.sizes.large}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </Box>
  )
}

export default Slider
