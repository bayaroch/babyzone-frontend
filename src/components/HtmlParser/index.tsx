import parse, { HTMLReactParserOptions } from 'html-react-parser'

interface HtmlParserProps {
  html: string
  options?: HTMLReactParserOptions | undefined
}

const HTMLParser: React.FC<HtmlParserProps> = (props) => {
  const { html, options } = props

  return <>{parse(html, options && options)}</>
}

export default HTMLParser
