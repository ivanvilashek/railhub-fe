'use client'

import { Routes } from '@app/lib/constants'
import { CreateScheduleForm } from '@app/ui/schedules/create-schedule-form'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <Link
        className="flex flex-row items-center gap-x-1 text-base font-medium text-gray-8"
        href={Routes.SCHEDULES}
      >
        <FaArrowLeft className="h-3 w-3" />
        <span>Back to Schedules</span>
      </Link>

      <CreateScheduleForm />
    </div>
  )
}

export default Page
