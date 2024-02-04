import { db } from '@/lib/db';

export async function GET(req: Request) {
	const url = new URL(req.url);
	const q = url.searchParams.get('q');

	if (!q) return new Response('Invalid query', { status: 400 });

	const keywords = q.split(' ');

	const searchConditions = keywords.map((keyword) => ({
		name: {
			contains: keyword,
		},
		actived: true,
	}));

	const results = await db.pura.findMany({
		where: {
			OR: searchConditions,
		},
		include: {
			_count: true,
		},
		take: 5,
	});

	return new Response(JSON.stringify(results));
}
