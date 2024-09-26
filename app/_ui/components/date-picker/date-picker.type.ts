import { CalendarProps } from 'react-calendar'
import { InputProps } from '../input'

export type DatePickerProps = CalendarProps &
  Pick<InputProps, 'label' | 'placeholder' | 'id' | 'aria-describedby' | 'name'>
