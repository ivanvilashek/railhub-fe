import { API, SCHEDULES } from '@app/lib/constants'
import api from '@app/lib/queries/api'
import { getQueryClient } from '@app/lib/utils'
import { Schedules } from '@app/ui/schedules/schedules'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

const Page: React.FC<{
  searchParams: { page: string; search: string; sort: string; dir: string }
}> = async ({ searchParams }) => {
  const queryClient = getQueryClient()

  const { dir, sort, search } = searchParams
  const page = Number(searchParams.page) || 1

  const queryKey = [SCHEDULES, page]

  dir && queryKey.push(dir)
  sort && queryKey.push(sort)
  search && queryKey.push(search)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get(API.SCHEDULES, {
        params: {
          page,
          limit: 10,
          ...(dir && { dir }),
          ...(sort && { sort }),
          ...(search && { search }),
        },
      })
      return data
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col gap-y-6">
        <p className="text-xl font-medium text-gray-8">Schedule List</p>

        <Schedules />
      </div>
    </HydrationBoundary>
  )
}

export default Page
