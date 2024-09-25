import { tw } from '@app/lib/utils'

export const BASE_BUTTON = tw`relative flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium leading-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50`

const PRIMARY_BUTTON = tw`bg-primary text-white hover:bg-purple-7 focus-visible:outline-purple-6 active:bg-purple-8`

const SECONDARY_BUTTON = tw`bg-transparent text-primary ring-1 ring-primary hover:bg-gray-1/10 hover:text-purple-7 hover:ring-purple-7 active:bg-gray-2/20 active:text-purple-8 active:ring-purple-8 aria-disabled:bg-gray-2/30`

const TERTIARY_BUTTON = tw`bg-transparent text-primary hover:bg-gray-1/10 hover:text-purple-7 active:bg-gray-2/20 active:text-purple-8 aria-disabled:bg-gray-2/30`

const PRIMARY_BUTTON_LOADER = tw`!border-gray-2 !border-b-transparent`
const SECONDARY_BUTTON_LOADER = tw`!border-slate-900/50`
const TERTIARY_BUTTON_LOADER = tw`!border-blue-500`

export const ButtonVariants = {
  primary: {
    button: PRIMARY_BUTTON,
    loader: PRIMARY_BUTTON_LOADER,
  },
  secondary: {
    button: SECONDARY_BUTTON,
    loader: SECONDARY_BUTTON_LOADER,
  },
  tertiary: {
    button: TERTIARY_BUTTON,
    loader: TERTIARY_BUTTON_LOADER,
  },
}
