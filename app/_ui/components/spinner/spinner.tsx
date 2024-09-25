import React from 'react'
import { SpinnerProps } from './spinner.type'
import clsx from 'clsx'

export const Spinner: React.FC<SpinnerProps> = ({
  speed = 0.75,
  className,
}) => {
  return (
    <div
      style={{ animationDuration: `${speed}s` }}
      className={clsx(
        'h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary border-b-gray-2',
        className
      )}
    />
  )
}
