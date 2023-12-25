import { z } from 'zod';

export const SubredditValidator = z.object({
	name: z.string().min(3).max(21),
});

export const UserRoleValidator = z.object({
	puraId: z.string(),
	userId: z.string(),
});

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;
export type SubscribeToSubredditPayload = z.infer<typeof UserRoleValidator>;

export const PuraValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nama Pura harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama Pura tidak boleh lebih dari 128 karakter',
		}),
	konten: z.any(),
	tahunBerdiri: z.number(),
	alamat: z
		.string()
		.min(3, {
			message: 'Alamat harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Alamat tidak boleh lebih dari 128 karakter',
		}),
	piodalan: z
		.string()
		.min(3, {
			message: 'Piodalan harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Piodalan tidak boleh lebih dari 128 karakter',
		}),
	kategori: z.enum(['KAWITAN', 'SWAGINA', 'KAHYANGAN_DESA', 'KAHYANGAN_JAGAT']),
	thumbnail: z.any(),
});

export const KontenPuraValidator = z.object({
	title: z
		.string()
		.min(3, {
			message: 'Title must be at least 3 characters long',
		})
		.max(128, {
			message: 'Title must be less than 128 characters long',
		}),
	content: z.any(),
});

export type KontenPuraCreationRequest = z.infer<typeof KontenPuraValidator>;
