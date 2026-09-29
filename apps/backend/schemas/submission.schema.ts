import { z } from "zod";

export const submitLinkSchema = z
  .object({
    youtubeLink: z.string().optional(),
    driveLink: z.string().optional(),
  })
  .refine((data) => !!data.driveLink?.trim() || !!data.youtubeLink?.trim(), {
    message: "At least one Link is required",
    path: ["youtubeLink"],
  });
