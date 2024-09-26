import { isAfter } from 'date-fns'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  firstName: z
    .string({ invalid_type_error: 'Please enter a first name.' })
    .min(3, 'First name must contain at least 3 characters'),
  lastName: z
    .string({ invalid_type_error: 'Please enter a last name.' })
    .min(3, 'Last name must contain at least 3 characters'),
  email: z.string().email('Please enter a valid email.'),
  password: z
    .string({ invalid_type_error: 'Please enter a password' })
    .min(6, 'Password must contain at least 6 characters'),
})

export const SignUpSchema = UserSchema.omit({ id: true })

export const SignInSchema = UserSchema.pick({ email: true, password: true })

export const ScheduleSchema = z
  .object({
    train: z
      .string({ invalid_type_error: 'Please enter a train ID.' })
      .min(3, 'Train ID must contain at least 3 characters'),
    departure: z
      .string({ invalid_type_error: 'Please enter a departure place.' })
      .min(3, 'Departure placemust contain at least 3 characters'),
    arrival: z
      .string({ invalid_type_error: 'Please enter a arrival place.' })
      .min(3, 'Arrival place must contain at least 3 characters'),
    departureAt: z.coerce.date({ message: 'Please select departure date' }),
    arrivalAt: z.coerce.date({ message: 'Please select arrival date' }),
    price: z
      .number({ message: 'Please enter ticket price' })
      .gt(0, 'Please enter a valid price'),
  })
  .superRefine((data, ctx) => {
    if (isAfter(data?.departureAt, data?.arrivalAt)) {
      ctx.addIssue({
        path: ['arrivalAt'],
        code: 'custom',
        message: 'Arrival date must be after departure date',
      })
    }
  })
