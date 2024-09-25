'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { API, SCHEDULES } from '../constants'
import { Pagination, Schedule } from '../types'
import api from './api'

export const useSchedules = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search')
  const sort = searchParams.get('sort')
  const dir = searchParams.get('dir')

  const queryKey = [SCHEDULES, page]

  dir && queryKey.push(dir)
  sort && queryKey.push(sort)
  search && queryKey.push(search)

  return useQuery<Pagination<Schedule>>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get(API.SCHEDULES, {
        params: {
          page,
          limit: 10,
          ...(dir && { dir }),
          ...(sort && { sort }),
          ...(search && { search }),
        },
      })
      return data
    },
  })
}
