import { json } from 'stream/consumers';
import { z } from 'zod';

export const PelinggihValidator = z.object({
	nama: z
		.string()
		.min(3, {
			message: 'Nama Pelinggih harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama Pelinggih tidak boleh lebih dari 128 karakter',
		}),
	konten: z.any(),
	tahunPeninggalan: z.number(),
	thumbnail: z.any(),
	puraId: z.string(),
});

export const PratimaValidator = z.object({
	nama: z
		.string()
		.min(3, {
			message: 'Nama Pratima harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama Pratima tidak boleh lebih dari 128 karakter',
		}),
	konten: z.string().min(3, {
		message: 'Isi konten harus lebih dari 3 karakter',
	}),
	bahan: z
		.string()
		.min(3, {
			message: 'Nama bahan Pratima harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama bahan Pratima tidak boleh lebih dari 128 karakter',
		}),
	jenis: z
		.string()
		.min(3, {
			message: 'Nama jenis Pratima harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama jenis Pratima tidak boleh lebih dari 128 karakter',
		}),
	tahunPeninggalan: z.number(),
	thumbnail: z.any(),
	puraId: z.string(),
});
