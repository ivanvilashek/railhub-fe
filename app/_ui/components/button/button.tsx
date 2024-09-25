import clsx from 'clsx'
import { ButtonProps } from './button.type'
import { BASE_BUTTON, ButtonVariants } from './button.variants'
import { Spinner } from '../spinner'

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isDisabled,
  isLoading,
  ...rest
}) => {
  const buttonClasses = clsx(
    BASE_BUTTON,
    ButtonVariants[variant].button,
    className
  )

  const loaderClasses = clsx(
    'absolute !h-4 !w-4',
    ButtonVariants[variant].loader
  )

  return (
    <button
      {...rest}
      aria-disabled={isDisabled || isLoading}
      disabled={isDisabled || isLoading}
      className={buttonClasses}
    >
      {isLoading && <Spinner speed={0.75} className={loaderClasses} />}
      <div style={{ opacity: isLoading ? 0 : 1 }}>{children}</div>
    </button>
  )
}
