import usePosts from '@utils/hooks/usePosts'
import { useEffect } from 'react'
import MediaCard from '@components/MediaCard'
import Box from '@mui/material/Box'
import _ from 'lodash'
import {
  WindowScroller,
  List,
  CellMeasurer,
  AutoSizer,
  CellMeasurerCache,
  InfiniteLoader,
} from 'react-virtualized'
import Loader from '@components/Loader'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 800,
})

interface PostListProps {
  category?: number | undefined
  tag?: number | undefined
}

const PostList: React.FC<PostListProps> = ({ category, tag }) => {
  const { initList, list, loadMore, paginationMeta, meta } = usePosts(
    category,
    tag
  )

  function isRowLoaded({ index }: any) {
    return !!list[index]
  }

  useEffect(() => {
    initList({ per_page: 10, page: 1, category: category, tag: tag })
  }, [category])

  useEffect(() => {
    const updateSize = () => {
      cache.clearAll()
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const rowRenderer = ({ index, key, style, parent }: any) => {
    const post = list[index]
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        columnCount={1}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ registerChild, measure }) => (
          <Box
            key={key}
            style={style}
            ref={registerChild}
            sx={{
              padding: {
                lg: '4px',
                md: '4px,',
                sm: '4px',
                content: 0,
                xs: 0,
              },
            }}
          >
            <MediaCard
              onLoad={measure}
              key={post.id}
              title={post.title.rendered}
              date={post.date}
              desc={post.excerpt.rendered}
              term={
                _.get(
                  post,
                  "_embedded['wp:term'][0][0].name",
                  undefined
                ) as string
              }
              media={
                (_.get(
                  post,
                  "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url",
                  undefined
                ) as string) ||
                (_.get(
                  post,
                  "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                  undefined
                ) as string)
              }
              id={post.id}
            />
          </Box>
        )}
      </CellMeasurer>
    )
  }

  return (
    <Box>
      {list && (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMore}
          rowCount={Number(paginationMeta.total_page)}
          threshold={1}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, scrollTop, isScrolling }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    return (
                      <List
                        ref={registerChild}
                        isScrolling={isScrolling}
                        autoHeight
                        height={height}
                        width={width}
                        scrollTop={scrollTop}
                        rowHeight={cache.rowHeight}
                        deferredMeasurementCache={cache}
                        rowRenderer={rowRenderer}
                        onRowsRendered={onRowsRendered}
                        rowCount={list.length}
                      />
                    )
                  }}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      )}
      {meta.pending && list === undefined ? (
        <Loader
          width="100%"
          height={500}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
        />
      ) : null}
    </Box>
  )
}

export default PostList
