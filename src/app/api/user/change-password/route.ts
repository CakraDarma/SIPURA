import { getUserByEmail } from '@/data/user';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ChangePasswordValidator } from '@/lib/validators/user';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession();
		if (!session?.user.email) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { newPassword, password } = ChangePasswordValidator.parse(body);

		const existingUser = await getUserByEmail(session.user.email);

		if (!existingUser || !existingUser.email || !existingUser.password) {
			return new Response('Unauthorized', { status: 401 });
		} else {
			const passwordsMatch = await bcrypt.compare(
				password,
				existingUser.password
			);
			if (!passwordsMatch)
				return new Response('Password lama salah', { status: 402 });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// update username
		await db.user.update({
			where: {
				id: session?.user.id,
			},
			data: {
				password: hashedPassword,
			},
		});

		return new Response('OK');
	} catch (error) {
		error;

		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not update password at this time. Please try later',
			{ status: 500 }
		);
	}
}
