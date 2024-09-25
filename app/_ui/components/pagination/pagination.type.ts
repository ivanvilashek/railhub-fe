export type PaginationNumberProps = {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
}

export type PaginationArrowProps = {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}

export type PaginationProps = { total: number }
