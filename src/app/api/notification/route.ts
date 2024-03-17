import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
	const { puraIds } = await req.json();
	const session = await getAuthSession();

	if (session) {
		const results = await db.pura.findMany({
			where: {
				subscribers: {
					some: {
						userId: {
							equals: session.user.id,
						},
					},
				},
				actived: true,
			},
		});
		return new Response(JSON.stringify(results));
	}

	if (!puraIds) {
		return new Response('Pura IDs not provided', { status: 400 });
	}
	try {
		const results = await db.pura.findMany({
			where: {
				id: {
					in: puraIds,
				},
				actived: true,
			},
		});

		return new Response(JSON.stringify(results));
	} catch (error) {
		console.error('Error fetching data:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}
