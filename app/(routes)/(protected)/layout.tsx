import { API, USER } from '@app/lib/constants'
import api from '@app/lib/queries/api'
import { getQueryClient } from '@app/lib/utils'
import { Header } from '@app/ui/header'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: [USER],
    queryFn: async () => {
      const { data } = await api.get(API.CURRENT_USER)
      return data
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="flex h-auto min-h-screen bg-stroke-2 px-4 pb-4 pt-16 md:px-16 md:pb-10 md:pt-20">
        {children}
      </main>
    </HydrationBoundary>
  )
}

export default Layout
