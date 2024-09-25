import { Schedule } from '@app/lib/types'

export type SchedulesTableProps = {
  data?: Schedule[]
  isLoading?: boolean
}

export type SortButtonProps = {
  sort: string
}
