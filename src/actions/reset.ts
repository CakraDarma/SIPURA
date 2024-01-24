'use server';

import * as z from 'zod';

import { ResetValidator } from '@/lib/validators/auth';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetValidator>) => {
	const validatedFields = ResetValidator.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid emaiL!' };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { success: 'Email untuk reset password dikirim!' };
	}

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return { success: 'Email untuk reset password dikirim!' };
};
