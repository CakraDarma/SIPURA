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

		// verify user is subscribed to passed pura id
		const subscription = await db.subscription.findFirst({
			where: {
				puraId,
				userId: session.user.id,
			},
		});

		if (!subscription) {
			return new Response('Subscribe to kegiatan', { status: 403 });
		}

		await db.kegiatan.create({
			data: {
				title,
				content,
				authorId: session.user.id,
				puraId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not kegiatan to pura at this time. Please try later',
			{ status: 500 }
		);
	}
}
