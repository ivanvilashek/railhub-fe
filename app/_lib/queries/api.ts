import axios, { AxiosError } from 'axios'
import { ACCESS_TOKEN, API, REFRESH_TOKEN, Routes } from '../constants'
import Cookies from 'js-cookie'
import { getCookie } from '../actions'
import { Tokens } from '../types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const isServer = () => {
  return typeof window === 'undefined'
}

async function refreshAccessToken() {
  try {
    let refreshToken = Cookies.get(REFRESH_TOKEN)

    if (isServer()) {
      refreshToken = await getCookie(REFRESH_TOKEN)
    }

    if (!isServer() && !refreshToken) {
      window.location.href = Routes.SIGN_IN
    }

    const { data } = await axios.post<Pick<Tokens, 'accessToken'>>(
      process.env.NEXT_PUBLIC_API_URL + API.REFRESH_TOKEN,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    )

    const { accessToken } = data

    if (accessToken) {
      Cookies.set(ACCESS_TOKEN, accessToken)
    }

    return accessToken
  } catch (error) {
    console.error(error)

    const err = error as AxiosError

    if (!isServer() && err.response?.status === 401) {
      Cookies.remove(ACCESS_TOKEN)
      Cookies.remove(REFRESH_TOKEN)
      window.location.href = Routes.SIGN_IN
    }
  }
}

api.interceptors.request.use(async (config) => {
  let token = Cookies.get(ACCESS_TOKEN)

  if (isServer()) {
    token = await getCookie(ACCESS_TOKEN)
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
