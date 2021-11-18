import parse, { HTMLReactParserOptions } from 'html-react-parser'
import Box from '@mui/material/Box'

interface HtmlParserProps {
  html: string
  options?: HTMLReactParserOptions | undefined
}

const HTMLParser: React.FC<HtmlParserProps> = (props) => {
  const { html, options } = props

  return <Box>{parse(html, options)}</Box>
}

export default HTMLParser
