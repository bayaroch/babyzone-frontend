import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectFade, Pagination, Autoplay } from 'swiper'
import { css } from '@emotion/css'
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
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
        effect="fade"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {!!images &&
          images.map((img) => {
            return (
              <SwiperSlide
                key={img.id}
                className={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  height={img.sizes['large-height']}
                  width={img.sizes['large-height']}
                  className={css`
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: top center;
                  `}
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
