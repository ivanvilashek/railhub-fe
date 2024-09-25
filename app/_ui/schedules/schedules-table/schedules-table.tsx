'use client'

import { useUser } from '@app/lib/queries/user'
import React from 'react'

export const SchedulesTable = () => {
  const { data } = useUser()

  return (
    <div>
      {data?.firstName} {data?.lastName}
    </div>
  )
}
