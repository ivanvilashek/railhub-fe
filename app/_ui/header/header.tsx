'use client'

import { useUser } from '@app/lib/queries/user'
import React, { useCallback, useMemo } from 'react'
import { BsFillTrainFreightFrontFill } from 'react-icons/bs'
import { NavLinks } from '@app/ui/components/nav-links'
import { ACCESS_TOKEN, REFRESH_TOKEN, Routes } from '@app/lib/constants'
import { IoMdLogOut } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const Header = () => {
  const { data } = useUser()
  const { replace } = useRouter()

  const links = useMemo(
    () => [
      {
        label: 'Schedules',
        href: Routes.SCHEDULES,
      },
    ],
    []
  )

  const onLogout = useCallback(() => {
    Cookies.remove(ACCESS_TOKEN)
    Cookies.remove(REFRESH_TOKEN)
    replace(Routes.SIGN_IN)
  }, [replace])

  return (
    <header className="fixed top-0 z-10 flex w-full items-center gap-x-6 border-b border-b-gray-2 bg-white px-6">
      <div className="flex items-center justify-center space-x-2">
        <BsFillTrainFreightFrontFill className="h-5 w-5 fill-primary" />

        <p className="text-xl font-bold">
          <span className="text-primary">Rail</span>
          <span className="text-gray-9">Hub</span>
        </p>
      </div>

      <NavLinks links={links} />

      <div className="ml-auto flex items-center gap-x-6">
        <div
          className="flex cursor-pointer flex-row items-center gap-x-2 text-sm font-medium text-red-7"
          onClick={() => onLogout()}
        >
          <IoMdLogOut className="h-5 w-5" />
          <span>Logout</span>
        </div>

        <div
          className={
            'ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#ff80b5] to-primary ring-2 ring-white'
          }
        >
          <span className="select-none text-sm font-bold text-white">
            {`${data?.firstName.charAt(0)}${data?.lastName.charAt(0)}`}
          </span>
        </div>
      </div>
    </header>
  )
}
