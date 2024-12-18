import { z } from "zod";

const envSchema = z.object({
  MODE: z.string().default("dev"),
  VITE_API_URL: z.string().default("http://localhost:4000"),
});

export const env = envSchema.parse(import.meta.env);
