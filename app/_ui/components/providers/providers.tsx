'use client'

import { getQueryClient } from '@app/lib/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
