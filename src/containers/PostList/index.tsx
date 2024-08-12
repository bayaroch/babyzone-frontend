import React, { useEffect, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
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
import { postServices, PageMeta } from '@services/post.services'
import { WP_REST_API_Post } from 'wp-types'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 800,
})

interface PostListProps {
  category?: number
  tag?: number
}

const PostList: React.FC<PostListProps> = ({ category, tag }) => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const fields =
      'id,content,date,acf,slug,tags,title,excerpt,_links.wp:featuredmedia,_links.author,_links.wp:term,_embedded'
    const categoryParam = category ? `&categories=${category}` : ''
    const tagParam = tag ? `&tags=${tag}` : ''

    return postServices.getAllPosts(
      { page: pageParam, per_page: 10, category, tag },
      `${fields}${categoryParam}${tagParam}`
    )
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch,
  } = useInfiniteQuery(['posts', { category, tag }], fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(Number(lastPage.headers) / 10)
      if (pages.length < totalPages) {
        return pages.length + 1
      }
      return undefined
    },
  })

  const list: WP_REST_API_Post[] = data
    ? data.pages.reduce<WP_REST_API_Post[]>(
        (acc, page) => [...acc, ...page.data],
        []
      )
    : []

  const paginationMeta: PageMeta = {
    page: data ? data.pages.length : 1,
    per_page: 10,
    total_page:
      data && data.pages[0] ? Math.ceil(Number(data.pages[0].headers) / 10) : 0,
  }

  const initList = useCallback(() => {
    refetch()
  }, [refetch])

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage()
    }
  }

  useEffect(() => {
    initList()
  }, [category, tag, initList])

  useEffect(() => {
    const updateSize = () => {
      cache.clearAll()
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  function isRowLoaded({ index }: { index: number }) {
    return !!list[index]
  }

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
                _.get(post, "_embedded['wp:term'][0][0].name", '') as string
              }
              media={
                (_.get(
                  post,
                  "_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url",
                  ''
                ) as string) ||
                (_.get(
                  post,
                  "_embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url",
                  ''
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
      {list.length > 0 && (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMore}
          rowCount={paginationMeta.total_page * 10}
          threshold={1}
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, scrollTop, isScrolling }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
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
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      )}
      {status === 'loading' && list.length === 0 && (
        <Loader
          width="100%"
          height={500}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
        />
      )}
      {isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Loader
            width="50px"
            height="50px"
            display="flex"
            alignItems={'center'}
            justifyContent={'center'}
          />
        </Box>
      )}
      {status === 'error' && <div>Error: {(error as Error).message}</div>}
    </Box>
  )
}

export default PostList
