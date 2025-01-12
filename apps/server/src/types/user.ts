import { z } from 'zod'

export const ZEditProfileReq = z.object({
	phone: z.string().optional().nullable(),
	dob: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	city: z.string().optional().nullable(),
	state: z.string().optional().nullable(),
	zipCode: z.string().optional().nullable(),
	country: z.string().optional().nullable(),
})
export type IEditProfileReq = z.infer<typeof ZEditProfileReq>
