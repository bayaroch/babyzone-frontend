import Box from '@mui/material/Box'
import HTMLParser from '@components/HtmlParser'
import { BoxProps } from '@mui/material'
import YouTube from '@components/Youtube'
import { HTMLReactParserOptions } from 'html-react-parser'
import { Steps } from '@components/PostElements'
import { StepItemType } from '@components/PostElements/Steps'
import _ from 'lodash'

interface HtmlParserProps extends BoxProps {
  content: string
  steps?: StepItemType[]
}

const Content: React.FC<HtmlParserProps> = ({ steps, content, ...rest }) => {
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
      {!_.isEmpty(steps) ? (
        <Steps steps={steps as []} sx={{ marginTop: 1 }} />
      ) : (
        ''
      )}
    </Box>
  )
}

export default Content
