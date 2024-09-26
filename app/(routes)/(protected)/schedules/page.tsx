import { API, Routes, SCHEDULES } from '@app/lib/constants'
import api from '@app/lib/queries/api'
import { getQueryClient } from '@app/lib/utils'
import { Button } from '@app/ui/components'
import { Schedules } from '@app/ui/schedules/schedules'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import Link from 'next/link'
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
          limit: 8,
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
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-gray-8">Schedule List</p>

          <Link href={`${Routes.SCHEDULES}/create`}>
            <Button variant={'primary'}>Create</Button>
          </Link>
        </div>

        <Schedules />
      </div>
    </HydrationBoundary>
  )
}

export default Page
