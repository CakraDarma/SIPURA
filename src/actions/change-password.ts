'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { ChangePasswordValidator } from '@/lib/validators/user';
import { getAuthSession } from '@/lib/auth';

export const changePassword = async (
	values: z.infer<typeof ChangePasswordValidator>
) => {
	const session = await getAuthSession();
	const validatedFields = ChangePasswordValidator.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	if (!session) {
		return { error: 'Session undefined' };
	}
	console.log(validatedFields);
	console.log(session);

	const { password, newPassword } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	await db.user.update({
		data: {
			password: hashedPassword,
		},
		where: {
			id: session.user.id,
		},
	});

	return { success: 'Password berhasil dirubah!' };
};
