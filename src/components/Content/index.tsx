import Box from '@mui/material/Box'
import HTMLParser from '@components/HtmlParser'
import { BoxProps } from '@mui/material'
import YouTube from '@components/Youtube'
import { HTMLReactParserOptions } from 'html-react-parser'

interface HtmlParserProps extends BoxProps {
  content: string
}

const Content: React.FC<HtmlParserProps> = ({ content, ...rest }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.name !== 'iframe') {
        return
      }
      const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/
      if (domNode.name === 'iframe' && regex.test(domNode.attribs.src)) {
        return <YouTube youtubeSrc={domNode.attribs.src} />
      }
    },
  }
  return (
    <Box className="content" {...rest}>
      <HTMLParser html={content} options={options} />
    </Box>
  )
}

export default Content
