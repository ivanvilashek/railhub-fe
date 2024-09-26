'use client'

import { ScheduleSortKeys } from '@app/lib/constants'
import { format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { SchedulesTableProps } from './schedules-table.type'
import { SchedulesTableSkeleton } from '../schedules-table-skeleton'
import { SortButton } from './sort-button'
import { UpdateScheduleButton } from '../update-schedule-button'

export const SchedulesTable: React.FC<SchedulesTableProps> = ({
  data,
  isLoading = true,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const sort = searchParams.get('sort')
  const dir = searchParams.get('dir')

  const onSortQueryChange = useCallback(
    (value: ScheduleSortKeys) => {
      const params = new URLSearchParams(searchParams)
      const sortDir = value === sort && dir === 'asc' ? 'desc' : 'asc'

      params.set('sort', value)
      params.set('dir', sortDir)

      replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, sort, dir, replace, pathname]
  )

  if (isLoading) {
    return <SchedulesTableSkeleton />
  }

  return (
    <>
      <table className="min-w-full table-fixed text-gray-6">
        <thead className="border-y border-y-stroke-2 bg-gray-1 text-left text-sm font-normal">
          <tr>
            <th
              scope="col"
              className="w-[15%] cursor-pointer select-none py-5 pl-6 pr-3 font-medium"
              onClick={() => onSortQueryChange(ScheduleSortKeys.TRAIN)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Train</span>
                <SortButton sort={ScheduleSortKeys.TRAIN} />
              </div>
            </th>

            <th
              scope="col"
              className="w-[15%] cursor-pointer select-none px-3 py-5 font-medium"
              onClick={() => onSortQueryChange(ScheduleSortKeys.ARRIVAL)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Arrival</span>
                <SortButton sort={ScheduleSortKeys.ARRIVAL} />
              </div>
            </th>

            <th
              scope="col"
              className="w-[15%] cursor-pointer select-none px-3 py-5 font-medium"
              onClick={() => onSortQueryChange(ScheduleSortKeys.DEPARTURE)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Departure</span>
                <SortButton sort={ScheduleSortKeys.DEPARTURE} />
              </div>
            </th>

            <th
              scope="col"
              className="hidden w-[15%] cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
              onClick={() => onSortQueryChange(ScheduleSortKeys.ARRIVAL_AT)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Arrival At</span>
                <SortButton sort={ScheduleSortKeys.ARRIVAL_AT} />
              </div>
            </th>

            <th
              scope="col"
              className="hidden w-[15%] cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
              onClick={() => onSortQueryChange(ScheduleSortKeys.DEPARTURE_AT)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Departure At</span>
                <SortButton sort={ScheduleSortKeys.DEPARTURE_AT} />
              </div>
            </th>

            <th
              scope="col"
              className="hidden w-[15%] cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
              onClick={() => onSortQueryChange(ScheduleSortKeys.PRICE)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <span>Price</span>
                <SortButton sort={ScheduleSortKeys.PRICE} />
              </div>
            </th>

            <th
              scope="col"
              className="hidden w-[10%] px-3 py-5 font-medium md:table-cell"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.map((item) => (
            <tr
              key={item.id}
              className="w-full border-b border-stroke-2 py-3 text-sm last-of-type:border-none"
            >
              <td className="whitespace-nowrap py-3 pl-6 pr-3">{item.train}</td>
              <td className="whitespace-nowrap px-3 py-3">{item.arrival}</td>
              <td className="whitespace-nowrap px-3 py-3">{item.departure}</td>
              <td className="hidden whitespace-nowrap px-3 py-3 md:table-cell">
                {format(item.arrivalAt, 'dd MMM, yyyy')}
              </td>
              <td className="hidden whitespace-nowrap px-3 py-3 md:table-cell">
                {format(item.departureAt, 'dd MMM, yyyy')}
              </td>
              <td className="hidden whitespace-nowrap px-3 py-3 md:table-cell">
                {`₴${item.price}`}
              </td>

              <td className="hidden whitespace-nowrap px-3 py-3 md:table-cell">
                <div className="flex items-center justify-center gap-x-3">
                  <UpdateScheduleButton id={item.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!data?.length && (
        <div className="flex w-full border-collapse items-center justify-center px-6 py-6">
          No data found
        </div>
      )}
    </>
  )
}
