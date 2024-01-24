import { z } from 'zod';

export const RegisterValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nama harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama tidak boleh lebih dari 128 karakter',
		}),
	password: z
		.string()
		.min(6, {
			message: 'password harus lebih dari 6 karakter',
		})
		.max(128, {
			message: 'password tidak boleh lebih dari 128 karakter',
		}),
	email: z.string().email({
		message: 'Email is required',
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
});

export const LoginValidator = z.object({
	email: z.string().email({
		message: 'Email tidak boleh kosong',
	}),
	password: z.string().min(1, {
		message: 'Password tidak boleh kosong',
	}),
});

export const ResetValidator = z.object({
	email: z.string().email({
		message: 'Email tidak boleh kosong',
	}),
});
