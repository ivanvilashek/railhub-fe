import { redirect } from 'next/navigation'
import { Routes } from '@app/lib/constants'

const Page = () => {
  return redirect(Routes.SCHEDULES)
}

export default Page
