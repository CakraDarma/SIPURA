import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PratimaValidator } from '@/lib/validators/inventaris';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { konten, nama, tahunDitemukan, thumbnail, puraId } =
			PratimaValidator.parse(body);

		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const pura = await db.pura.findFirst({
			where: {
				id: puraId,
			},
		});
		if (!pura) {
			return new Response('Pura Not Found', { status: 403 });
		}

		// verify user is prajuru to passed pura id
		const userRole = await db.userRole.findFirst({
			where: {
				puraId: pura.id,
				userId: session.user.id,
			},
		});

		if (!userRole && session.user.role !== 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.pratima.create({
			data: {
				konten,
				nama,
				tahunDitemukan,
				thumbnail,
				userId: session.user.id,
				puraId: pura.id,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}
		return new Response(
			'Could not submit pratima to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
