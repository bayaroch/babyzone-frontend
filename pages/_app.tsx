import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { storeWrapper, StoreType } from '@store/store'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import PageWithLayoutType from '@constants/page'
import theme from '@theme/index'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useStore } from 'react-redux'
import { authorizationProvider } from '@services/interceptor'
import createCache from '@emotion/cache'
import moment from 'moment'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import '@css/main.scss'
import { StylesProvider } from '@mui/styles'
import Seo from '@components/Seo'
import _ from 'lodash'
import { Box } from '@mui/material'
moment.locale('mn')

export const cache = createCache({ key: 'css', prepend: true })
/**
 * withRedux HOC
 * NextJS wrapper for Redux
 */

type Props = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
  emotionCache?: EmotionCache
}

const CustomApp = ({ Component, pageProps }: Props) => {
  const Layout = Component.Layout ? Component.Layout : React.Fragment
  const store: StoreType = useStore()
  authorizationProvider()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const data = _.isArray(pageProps.posts) ? pageProps.posts[0] : null

  return (
    <StylesProvider injectFirst>
      <CacheProvider value={cache}>
        <Seo
          title={_.get(data, 'title.rendered', undefined) || 'babyzone.mn'}
          description={
            _.get(data, 'excerpt.rendered', undefined) || 'babyzone.mn'
          }
          image={
            (_.get(
              data,
              "_embedded['wp:featuredmedia'][0].media_details.sizes.og-image.source_url",
              ''
            ) as string) ||
            (_.get(
              data,
              "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
              ''
            ) as string)
          }
        />
        <PersistGate
          persistor={persistStore(store)}
          loading={
            <Box
              width="100%"
              height={500}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
            >
              <img src={'/images/loader-white.gif'} />
            </Box>
          }
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </CacheProvider>
    </StylesProvider>
  )
}

export default storeWrapper.withRedux(CustomApp)
