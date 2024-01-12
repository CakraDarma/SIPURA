import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { kegiatanValidator } from '@/lib/validators/kegiatan';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const { title, content, puraId } = kegiatanValidator.parse(body);

		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		// verify user is prajuru to passed pura id
		const userRole = await db.userRole.findFirst({
			where: {
				puraId,
				userId: session.user.id,
			},
		});

		if (!userRole && session.user.role !== 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.kegiatan.create({
			data: {
				title,
				content,
				userId: session.user.id,
				puraId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not submit Kegiatan to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
