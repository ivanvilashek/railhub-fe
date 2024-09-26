import { Routes } from '@app/lib/constants'
import Link from 'next/link'
import React from 'react'
import { LuPencil } from 'react-icons/lu'
import { UpdateScheduleButtonProps } from './update-schedule-button.type'

export const UpdateScheduleButton: React.FC<UpdateScheduleButtonProps> = ({
  id,
}) => {
  return (
    <Link href={`${Routes.SCHEDULES}/${id}/edit`}>
      <div className="flex w-fit flex-row items-center gap-x-2 rounded-full border border-stroke-1 px-2 py-1 text-sm hover:bg-gray-2">
        <LuPencil className="h-3 w-3" />
        Edit
      </div>
    </Link>
  )
}
