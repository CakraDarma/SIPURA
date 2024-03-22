import { z } from 'zod';

export const BantenValidator = z.object({
	nama: z
		.string()
		.min(3, {
			message: 'Nama banten harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama banten tidak boleh lebih dari 128 karakter',
		}),
	puraId: z.string(),
	thumbnail: z.any(),
	kategori: z.enum(['PENGRESIKAN', 'AYABAN', 'PENGHARAPAN', 'LAINNYA']),
	deskripsi: z.string().min(3, {
		message: 'Deskripsi banten harus lebih dari 3 karakter',
	}),
	komponen: z.string().min(3, {
		message: 'Komponen banten harus lebih dari 3 karakter',
	}),
});
