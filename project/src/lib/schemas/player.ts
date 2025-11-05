import { z } from 'zod'

export const ProfileSchema = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
  photo_url: z.string().url().optional(),
  bio: z.string().max(1000).optional(),
  position: z.string().optional(),
  height_cm: z.number().int().optional(),
  weight_kg: z.number().int().optional(),
  dominant_hand: z.enum(['left', 'right', 'both']).optional(),
})

export type Profile = z.infer<typeof ProfileSchema>
