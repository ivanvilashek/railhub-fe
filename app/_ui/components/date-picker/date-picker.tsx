'use client'

import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { Input } from '../input'
import Calendar from 'react-calendar'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FiCalendar } from 'react-icons/fi'
import { formatDate, isValid } from 'date-fns'
import { DatePickerProps } from './date-picker.type'
import { useClickOutside } from '@app/lib/hooks'

const Base: ForwardRefRenderFunction<HTMLInputElement, DatePickerProps> = (
  { label, value, onChange, placeholder, name, id, ...rest },
  ref
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(containerRef, () => {
    const container = containerRef.current
    if (container) {
      setIsOpen(false)
    }
  })

  return (
    <div className="relative" ref={containerRef}>
      {isOpen && (
        <div className="absolute bottom-16 z-10 w-80 rounded-md border border-stroke-1 bg-white shadow-lg">
          <Calendar
            onChange={(value, event) => {
              onChange?.(value, event)
              setIsOpen(false)
            }}
            prev2Label={null}
            next2Label={null}
            prevLabel={<IoIosArrowBack className="h-6 w-6" />}
            nextLabel={<IoIosArrowForward className="h-6 w-6" />}
            {...rest}
            value={value}
          />
        </div>
      )}
      <Input
        isReadOnly
        ref={ref}
        label={label}
        id={id}
        aria-describedby={rest['aria-describedby']}
        name={name}
        type="date"
        value={
          isValid(new Date(value as string))
            ? formatDate(new Date(value as string), 'yyyy-MM-dd')
            : ''
        }
        placeholder={placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={FiCalendar}
      />
    </div>
  )
}

export const DatePicker = forwardRef(Base)
