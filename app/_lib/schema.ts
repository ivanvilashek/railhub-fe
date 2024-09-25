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
