import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserValidator } from '@/lib/validators/user';
import { z } from 'zod';

export async function PATCH(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { name, alamat, telepon, thumbnail } = UserValidator.parse(body);

		if (session.user.name !== name && session.user.role !== 'ADMIN') {
			return new Response('Unauthorized', { status: 401 });
		}

		// update username
		await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				name,
				alamat,
				telepon,
				image: thumbnail,
			},
		});

		return new Response('OK');
	} catch (error) {
		error;

		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not update username at this time. Please try later',
			{ status: 500 }
		);
	}
}
