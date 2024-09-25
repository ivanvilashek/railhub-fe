import clsx from 'clsx'
import { PaginationArrowProps } from './pagination.type'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'

export const PaginationArrow: React.FC<PaginationArrowProps> = ({
  href,
  direction,
  isDisabled,
}) => {
  const className = clsx(
    'flex h-8 w-8 items-center justify-center rounded-md border border-gray-3 text-sm text-gray-6',
    {
      'pointer-events-none text-gray-3': isDisabled,
      'hover:bg-gray-2': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    }
  )

  const icon =
    direction === 'left' ? (
      <FaArrowLeft className="w-4" />
    ) : (
      <FaArrowRight className="w-4" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
