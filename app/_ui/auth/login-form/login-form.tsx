'use client'

import { SignInSchema } from '@app/lib/schema'
import { Button, Input } from '@app/ui/components'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RiErrorWarningLine } from 'react-icons/ri'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, Routes } from '@app/lib/constants'
import { useRouter } from 'next/navigation'
import { useLogin } from '@app/lib/queries/auth'
import { AxiosError } from 'axios'

export const LoginForm: React.FC = () => {
  const router = useRouter()

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutateAsync: login } = useLogin()

  const onSubmit: SubmitHandler<z.output<typeof SignInSchema>> = useCallback(
    async (data) => {
      try {
        const res = await login(data)

        Cookies.set(ACCESS_TOKEN, res.accessToken)
        Cookies.set(REFRESH_TOKEN, res.refreshToken)

        router.push(Routes.SCHEDULES)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data?.message)

          setError('root', {
            message: error.response?.data?.message || 'Something went wrong',
          })
        }
      }
    },
    [login, router, setError]
  )

  return (
    <div className="w-full max-w-lg rounded-3xl bg-gray-2 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-1 flex-col gap-y-6 rounded-2xl bg-white p-6 shadow-[0_24px_36px_0_#7B61FF14]">
          <p className="text-2xl font-medium text-gray-8">
            Sign in to your account
          </p>

          <div>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Enter your email address"
              aria-describedby="email-error"
              required
              {...register('email')}
            />

            <div id="email-error" aria-live="polite" aria-atomic="true">
              {errors?.email && (
                <p className="mt-1 text-sm text-red-7">
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-describedby="password-error"
              required
              {...register('password')}
            />

            <div id="password-error" aria-live="polite" aria-atomic="true">
              {errors?.password && (
                <p className="mt-1 text-sm text-red-7">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              variant="primary"
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
            >
              Submit
            </Button>

            {errors?.root && (
              <div
                className="mt-1 flex items-center space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <RiErrorWarningLine className="h-4 w-4 text-red-7" />
                <p className="text-sm text-red-7">{errors?.root?.message}</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
