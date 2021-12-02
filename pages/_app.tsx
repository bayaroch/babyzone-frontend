import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { storeWrapper, StoreType } from '@store/store'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import PageWithLayoutType from '@constants/page'
import theme from '@theme/index'
import { useStore, Provider } from 'react-redux'
import { authorizationProvider } from '@services/interceptor'
import createCache from '@emotion/cache'
import moment from 'moment'
import '@css/main.scss'
import { StylesProvider } from '@mui/styles'
import Seo from '@components/Seo'
import _ from 'lodash'
import 'moment/locale/mn'
import Head from 'next/head'

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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          ></meta>
          <meta property="fb:app_id" content="940486373573016" />
          <meta property="fb:admins" content="2648881205129171" />
        </Head>
        {pageProps.seo ? (
          <Seo
            title={_.get(data, 'og_title', undefined) || 'babyzone.mn'}
            description={
              _.get(data, 'og_content', undefined) ||
              'Шинэ ээж аавуудад, эмэгтэйчүүдэд жирэмслэлт, төрөлт, өсгөн хүмүүжүүлэх тал дээр хэрэгцээтэй мэдээллээр ханган туслах зорилготой.'
            }
            image={
              (_.get(data, 'og_image', '') as string) || 'images/default.png'
            }
          />
        ) : null}
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </StylesProvider>
  )
}

export default storeWrapper.withRedux(CustomApp)
