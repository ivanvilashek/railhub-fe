'use client'

import { useQuery } from '@tanstack/react-query'
import { API, USER } from '../constants'
import { User } from '../types'
import api from './api'

export const useUser = () =>
  useQuery<User>({
    queryKey: [USER],
    queryFn: async () => {
      const { data } = await api.get(API.CURRENT_USER)
      return data
    },
  })
