'use client'

import React, { useMemo } from 'react'
import { SchedulesTable } from '../schedules-table'
import { Pagination } from '@app/ui/components/pagination'
import { useSchedules } from '@app/lib/queries/schedules'
import { Input } from '@app/ui/components'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import _ from 'lodash'

export const Schedules = () => {
  const { data, isPending } = useSchedules()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const onQueryChange = useMemo(
    () =>
      _.debounce((value: string) => {
        const params = new URLSearchParams(searchParams)
        value ? params.set('search', value) : params.delete('search')
        replace(`${pathname}?${params.toString()}`)
      }, 400),
    [pathname, replace, searchParams]
  )

  return (
    <div className="flex flex-1 flex-col items-center gap-y-6">
      <div className="w-full overflow-hidden rounded-xl border border-stroke-1 bg-white">
        <div className="flex flex-col gap-y-4 px-3 py-3">
          <p className="text-sm text-gray-5">
            Start typing below to search by train, arrival or departure place.
            Click on table header to sort field
          </p>

          <Input
            label="Search"
            defaultValue={searchParams.get('search') || ''}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <SchedulesTable data={data?.data} isLoading={isPending} />
      </div>

      <Pagination total={Math.ceil((data?.total || 1) / 10)} />
    </div>
  )
}
