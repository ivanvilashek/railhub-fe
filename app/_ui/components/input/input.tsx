'use client'

import React, { ForwardRefRenderFunction, forwardRef, useState } from 'react'
import { InputProps } from './input.type'
import clsx from 'clsx'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { Icon } from '../icon'

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, isDisabled, isReadOnly, className, type, ...rest },
  ref
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const inputType = type === 'password' && isVisible ? 'text' : type

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <label className="relative flex flex-col-reverse">
      <input
        ref={ref}
        aria-disabled={isDisabled}
        readOnly={isReadOnly}
        disabled={isDisabled}
        className={clsx(
          'peer block w-full rounded-md border border-stroke-1 px-3 py-2.5 text-sm text-gray-10 transition-colors placeholder:text-gray-5 autofill:bg-white autofill:text-gray-10 focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-2 disabled:text-gray-5',
          type === 'password' ? 'pr-10' : '',
          className
        )}
        type={inputType}
        {...rest}
      />
      {type === 'password' && (
        <Icon
          icon={isVisible ? IoEyeOutline : IoEyeOffOutline}
          onClick={toggleVisibility}
          size={'1rem'}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer fill-gray-5 stroke-gray-5"
        />
      )}
      <span className="absolute -top-4 left-1.5 select-none text-xs text-gray-5 transition-colors peer-focus:text-primary">
        {label}
      </span>
    </label>
  )
}

export default forwardRef(Input)
