import { API, Routes, SCHEDULE } from '@app/lib/constants'
import api from '@app/lib/queries/api'
import { getQueryClient } from '@app/lib/utils'
import { EditScheduleForm } from '@app/ui/schedules/edit-schedule-form'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const queryClient = getQueryClient()

  const id = params.id

  await queryClient.prefetchQuery({
    queryKey: [SCHEDULE, id],
    queryFn: async () => {
      const { data } = await api.get(`${API.SCHEDULES}/${id}`)
      return data
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 flex-col gap-y-4">
        <Link
          className="flex flex-row items-center gap-x-1 text-base font-medium text-gray-8"
          href={Routes.SCHEDULES}
        >
          <FaArrowLeft className="h-3 w-3" />
          <span>Back to Schedules</span>
        </Link>

        <EditScheduleForm />
      </div>
    </HydrationBoundary>
  )
}

export default Page
