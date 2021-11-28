import { WEB } from '@constants/uri.constants'
import { NextRouter } from 'next/router'
import { useEffect } from 'react'

interface FBProps {
  href?: string | undefined
  router: NextRouter
}

const FacebookComment: React.FC<FBProps> = ({ href, router }) => {
  const asPath = `${WEB}${router.asPath}`

  useEffect(() => {
    const facebookScript = document.createElement('script')
    facebookScript.async = true
    facebookScript.crossOrigin = 'anonymous'
    facebookScript.defer = true
    facebookScript.nonce = 'nONi2pK2'
    facebookScript.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=940486373573016&autoLogAppEvents=1`
    document.body.appendChild(facebookScript)
  }, [])

  return (
    <>
      <div
        className="fb-comments"
        data-href={href ? href : asPath}
        data-numposts="10"
        data-width="100%"
      ></div>
    </>
  )
}

export default FacebookComment
