'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function setCookie(
  ...args:
    | [key: string, value: string, cookie?: Partial<ResponseCookie>]
    | [options: ResponseCookie]
) {
  cookies().set(...args)
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value
}
