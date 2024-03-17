import { db } from '@/lib/db';

export async function POST(req: Request) {
	const { puraIds } = await req.json();

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
		return new Response('Internal Server Error', { status: 500 });
	}
}
