import { z } from 'zod';

export const UserValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nama harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama tidak boleh lebih dari 128 karakter',
		}),
	alamat: z
		.string()
		.min(3, {
			message: 'Alamat harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Alamat tidak boleh lebih dari 128 karakter',
		}),
	telepon: z
		.string()
		.min(9, {
			message: 'Telepon harus lebih dari 9 karakter',
		})
		.max(14, {
			message: 'Telepon tidak boleh lebih dari 14 karakter',
		}),
	thumbnail: z.any(),
});
