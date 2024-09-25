import React from 'react'
import { SortButtonProps } from './schedules-table.type'
import { useSearchParams } from 'next/navigation'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

export const SortButton: React.FC<SortButtonProps> = ({ sort }) => {
  const searchParams = useSearchParams()
  const dir = searchParams.get('dir')

  if (sort !== searchParams.get('sort')) return null

  return dir === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />
}
