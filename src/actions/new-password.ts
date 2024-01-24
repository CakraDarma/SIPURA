'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { NewPasswordValidator } from '@/lib/validators/auth';

export const newPassword = async (
	values: z.infer<typeof NewPasswordValidator>,
	token?: string | null
) => {
	if (!token) {
		return { error: 'Missing token!' };
	}

	const validatedFields = NewPasswordValidator.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Input Invalid!' };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: 'Token Invalid!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'Token sudah kadaluwarsa!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Terjadi Kesalahan!' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.user.update({
		where: { id: existingUser.id },
		data: { password: hashedPassword },
	});

	await db.passwordResetToken.delete({
		where: { id: existingToken.id },
	});

	return { success: 'Password berhasil dirubah!' };
};
