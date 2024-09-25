export enum Routes {
  HOME = '/',
  SIGN_UP = '/register',
  SIGN_IN = '/login',
  PROFILE = '/profile/',
  SCHEDULES = '/schedules',
}

export const privateRoutes = [Routes.PROFILE, Routes.SCHEDULES]

export const publicRoutes = [Routes.HOME, Routes.SIGN_IN, Routes.SIGN_UP]
