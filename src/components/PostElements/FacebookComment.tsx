import { WEB } from '@constants/uri.constants'
import { NextRouter } from 'next/router'
import { FacebookProvider, Comments } from 'react-facebook'

interface FBProps {
  href?: string | undefined
  router: NextRouter
}

const FacebookComment: React.FC<FBProps> = ({ href, router }) => {
  const asPath = `${WEB}${router.asPath}`
  return (
    <>
      <FacebookProvider appId="940486373573016">
        <Comments width={'100%'} href={href ? href : asPath} />
      </FacebookProvider>
    </>
  )
}

export default FacebookComment
