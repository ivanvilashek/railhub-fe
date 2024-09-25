'use client'

import { useMutation } from '@tanstack/react-query'
import { Tokens, User } from '../types'
import api from './api'
import { API } from '../constants'

export const useLogin = () =>
  useMutation<Tokens, Error, Pick<User, 'email'> & { password: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post(API.SIGN_IN, payload)
      return data
    },
  })

export const useSignUp = () =>
  useMutation<Tokens, Error, Omit<User, 'id'> & { password: string }>({
    mutationFn: async (payload) => {
      const { data } = await api.post(API.SIGN_UP, payload)
      return data
    },
  })
