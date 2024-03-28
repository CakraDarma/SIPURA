import { z } from 'zod';

export const UpacaraValidator = z.object({
	nama: z
		.string()
		.min(3, {
			message: 'Nama upacara harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama upacara tidak boleh lebih dari 128 karakter',
		}),
	puraId: z.string(),
	thumbnail: z.any(),
	biaya: z.number(),
	deskripsi: z.string().min(3, {
		message: 'Deskripsi banten harus lebih dari 3 karakter',
	}),
	bantens: z
		.array(
			z.object({
				idBanten: z.string().min(3, { message: 'Banten tidak boleh kosong' }),
			})
		)
		.optional(),
	// bantenId: z.string(),
	// banten: z.any(),
});
