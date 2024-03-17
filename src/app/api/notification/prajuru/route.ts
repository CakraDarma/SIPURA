import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST() {
	const session = await getAuthSession();

	try {
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
	} catch (error) {
		return new Response('Internal Server Error', { status: 500 });
	}
}
