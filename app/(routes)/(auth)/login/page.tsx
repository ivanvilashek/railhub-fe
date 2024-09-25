import { Routes } from '@app/lib/constants'
import { LoginForm } from '@app/ui/auth/login-form'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Login',
}

const Page = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <LoginForm />

      <p className="text-center text-sm font-semibold text-gray-9">
        <span>Not a member?</span>
        <Link
          href={Routes.SIGN_UP}
          className="ml-1 cursor-pointer text-primary"
        >
          Create new account
        </Link>
      </p>
    </div>
  )
}

export default Page
