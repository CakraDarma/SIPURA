'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterValidator } from '@/lib/validators/auth';

export const register = async (values: z.infer<typeof RegisterValidator>) => {
	const validatedFields = RegisterValidator.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password, name, alamat, telepon, confirmPassword } =
		validatedFields.data;
	if (password !== confirmPassword) {
		return { error: 'Password tidak sama dengan konfirmasi password' };
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'Email Sudah Digunakan' };
	}

	await db.user.create({
		data: {
			name,
			email,
			alamat,
			telepon,
			password: hashedPassword,
		},
	});

	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);

	return { success: 'Konfirmasi email telah dikirim!' };
};
