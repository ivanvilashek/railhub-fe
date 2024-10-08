'use client'

import { generatePagination } from '@app/lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { PaginationProps } from './pagination.type'
import { PaginationNumber } from './pagination-number'
import { PaginationArrow } from './pagination-arrow'

export const Pagination: React.FC<PaginationProps> = ({ total }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const allPages = generatePagination(currentPage, total)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= total}
        />
      </div>
    </>
  )
}
