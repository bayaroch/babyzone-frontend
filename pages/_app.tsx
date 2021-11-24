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
import '@css/main.scss'
import { StylesProvider } from '@mui/styles'
import Seo from '@components/Seo'
import _ from 'lodash'
import Loader from '@components/Loader/'

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

  const data = pageProps.seo

  return (
    <StylesProvider injectFirst>
      <CacheProvider value={cache}>
        <Seo
          title={_.get(data, 'og_title', undefined) || 'babyzone.mn'}
          description={_.get(data, 'og_content', undefined) || 'babyzone.mn'}
          image={
            (_.get(data, 'og_image', '') as string) || '/images/default.png'
          }
        />
        <PersistGate
          persistor={persistStore(store)}
          loading={
            <Loader
              width="100%"
              height={500}
              display="flex"
              justifyContent={'center'}
              alignItems="center"
              color="white"
            />
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
