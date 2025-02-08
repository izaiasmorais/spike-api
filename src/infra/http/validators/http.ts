import { z } from "zod";

export const httpResponseSchema = z.object({
	success: z.boolean(),
	errors: z.array(z.string()),
	data: z.null(),
});
