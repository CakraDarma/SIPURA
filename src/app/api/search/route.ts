import { db } from '@/lib/db';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const q = url.searchParams.get('q');

	if (!q) return new Response('Invalid query', { status: 400 });

	const results = await db.pura.findMany({
		where: {
			name: {
				startsWith: q,
			},
			actived: true,
		},
		include: {
			_count: true,
		},
		take: 5,
	});

	return new Response(JSON.stringify(results));
}
