'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

import { generateVerificationToken } from '@/lib/tokens';
import { LoginValidator } from '@/lib/validators/auth';

export const login = async (values: z.infer<typeof LoginValidator>) => {
	const validatedFields = LoginValidator.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email atau password salah!' };
	} else {
		const passwordsMatch = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!passwordsMatch) return { error: 'Email atau password salah!' };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: 'Verifikasi email telah dikirim!' };
	}

	return { email, password };
};
