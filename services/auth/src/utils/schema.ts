import { z } from 'zod'

export const registerBodySchema = z.object({
	email: z.email(),
	password: z.string().min(1, 'Password is required'),
	name: z.string().min(1, 'Name is required'),
})

export const loginBodySchema = z.object({
	email: z.email(),
	password: z.string().min(1, 'Password is required'),
})
