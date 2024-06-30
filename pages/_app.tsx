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
import ReactGA4 from 'react-ga4'
import { useRouter } from 'next/router'

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

  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA4.send({
        hitType: 'pageview',
        page: url,
      })
    }

    // Subscribe to the route change events
    router.events.on('routeChangeComplete', handleRouteChange)

    // Unsubscribe from the events when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const trackingID = 'UA-52439723-1'

  useEffect(() => {
    trackingID &&
      ReactGA4.initialize(trackingID, {
        gaOptions: {
          cookieDomain: '.unimedia.mn', // Ensure cookies are accessible across subdomains
          cookieFlags: 'SameSite=None; Secure', // Set SameSite and Secure attributes
        },
      })
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
              (_.get(data, 'og_image', '') as string) || 'images/babyzone.jpg'
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
