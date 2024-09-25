import clsx from 'clsx'
import { PaginationNumberProps } from './pagination.type'
import Link from 'next/link'

export const PaginationNumber: React.FC<PaginationNumberProps> = ({
  page,
  href,
  isActive,
  position,
}) => {
  const className = clsx(
    'text-gray- flex h-8 w-8 items-center justify-center border border-gray-3 text-sm',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 !border-purple-5 bg-purple-5 !text-white': isActive,
      'hover:bg-gray-2': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    }
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}
