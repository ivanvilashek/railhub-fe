'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { API, Routes, SCHEDULE, SCHEDULES } from '../constants'
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
          limit: 7,
          ...(dir && { dir }),
          ...(sort && { sort }),
          ...(search && { search }),
        },
      })
      return data
    },
    refetchOnMount: 'always',
  })
}

export const useCreateSchedule = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<
    Schedule,
    Error,
    Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post(API.SCHEDULES, payload)
      return data
    },
    onError: () => router.push(Routes.SCHEDULES),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SCHEDULES] })
      router.push(Routes.SCHEDULES)
    },
  })
}

export const useSchedule = () => {
  const params = useParams()

  const id = params?.id as string

  return useQuery<Schedule>({
    queryKey: [SCHEDULE, id],
    queryFn: async () => {
      const { data } = await api.get(`${API.SCHEDULES}/${id}`)
      return data
    },
  })
}

export const useDeleteSchedule = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams()

  const id = params?.id as string

  return useMutation<Schedule, Error>({
    mutationFn: async () => {
      const { data } = await api.delete(`${API.SCHEDULES}/${id}`)
      return data
    },
    onError: () => router.push(Routes.SCHEDULES),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SCHEDULES] })
      router.push(Routes.SCHEDULES)
    },
  })
}

export const useUpdateSchedule = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams()

  const id = params?.id as string

  return useMutation<
    Schedule,
    Error,
    Partial<Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>>
  >({
    mutationFn: async (payload) => {
      const { data } = await api.patch(`${API.SCHEDULES}/${id}`, payload)
      return data
    },
    onError: () => router.push(Routes.SCHEDULES),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SCHEDULES, 1] })
      router.push(Routes.SCHEDULES)
    },
  })
}
