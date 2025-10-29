import { z } from "zod";

export const GetAlbumsQuerySchema = z.object({
    album_name: z.string().min(1),
});

export type GetAlbumsQuery = z.infer<typeof GetAlbumsQuerySchema>;
