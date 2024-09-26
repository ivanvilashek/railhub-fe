'use client'

import { TableRowSkeleton } from './table-row-skeleton'

export const SchedulesTableSkeleton: React.FC = () => {
  return (
    <table className="min-w-full text-gray-6">
      <thead className="border-y border-y-stroke-2 bg-gray-1 text-left text-sm font-normal">
        <tr>
          <th
            scope="col"
            className="cursor-pointer select-none py-5 pl-6 pr-3 font-medium"
          >
            Train
          </th>

          <th
            scope="col"
            className="cursor-pointer select-none px-3 py-5 font-medium"
          >
            Arrival
          </th>

          <th
            scope="col"
            className="cursor-pointer select-none px-3 py-5 font-medium"
          >
            Departure
          </th>

          <th
            scope="col"
            className="hidden cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
          >
            Arrival At
          </th>

          <th
            scope="col"
            className="hidden cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
          >
            Departure At
          </th>

          <th
            scope="col"
            className="hidden cursor-pointer select-none px-3 py-5 font-medium md:table-cell"
          >
            Price
          </th>

          <th
            scope="col"
            className="hidden cursor-pointer px-3 py-5 font-medium md:table-cell"
          >
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </tbody>
    </table>
  )
}
