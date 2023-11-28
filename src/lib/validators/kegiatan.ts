import { z } from 'zod';

export const kegiatanValidator = z.object({
	title: z
		.string()
		.min(3, {
			message: 'Title must be at least 3 characters long',
		})
		.max(128, {
			message: 'Title must be less than 128 characters long',
		}),
	content: z.any(),
	puraId: z.string(),
});

export type KegiatanCreationRequest = z.infer<typeof kegiatanValidator>;
