import { ButtonVariants } from './button.variants'

export type ButtonVariant = keyof typeof ButtonVariants

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'aria-disabled'
> & {
  children: React.ReactNode
  variant?: ButtonVariant
  isLoading?: boolean
  isDisabled?: boolean
}
