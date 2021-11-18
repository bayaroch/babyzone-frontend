import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

const YouTube = ({ youtubeSrc }: { youtubeSrc: string }): ReactJSXElement => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      {}
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={youtubeSrc}
        frameBorder="0"
      />
    </div>
  )
}

export default YouTube
