'use client'
import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export type ReactQueryProps = {
  children: React.ReactNode
}

const ReactQueryProvider: React.FC<PropsWithChildren<ReactQueryProps>> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
