import { z } from 'zod';

export const VirtualTourValidator = z.object({
	nama: z
		.string()
		.min(3, {
			message: 'Nama virtual tour harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama virtual tour tidak boleh lebih dari 128 karakter',
		}),
	virtualTour: z
		.string()
		.min(10, {
			message: 'Link tidak valid',
		})
		.max(128, {
			message: 'Link tidak valid',
		}),
	puraId: z.string(),
	thumbnail: z.any(),
});
