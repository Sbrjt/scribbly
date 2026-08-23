import { z } from "zod";

export const userParamsSchema = z.object({
  id: z.string(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar: z.string().url().optional(),
});
