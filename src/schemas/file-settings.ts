import { z } from "zod";

export const fileSettingsSchema = z.object({
  id: z.string(),
  title: z.string(),
  file: z.string(),
  userId: z.string(),
  category: z.string(),
  visibility: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FileSettings = z.infer<typeof fileSettingsSchema>;
