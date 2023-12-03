import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
	const url = new URL(req.url);

	const session = await getAuthSession();

	let puraAccessIds: string[] = [];

	if (session) {
		const puraAccess = await db.userRole.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				pura: true,
			},
		});

		puraAccessIds = puraAccess.map((sub) => sub.pura.id);
	}

	try {
		const { limit, page, puraName } = z
			.object({
				limit: z.string(),
				page: z.string(),
				puraName: z.string().nullish().optional(),
			})
			.parse({
				puraName: url.searchParams.get('puraName'),
				limit: url.searchParams.get('limit'),
				page: url.searchParams.get('page'),
			});

		let whereClause = {};

		if (puraName) {
			whereClause = {
				pura: {
					name: puraName,
				},
			};
		} else if (session) {
			whereClause = {
				pura: {
					id: {
						in: puraAccessIds,
					},
				},
			};
		}

		const kegiatans = await db.kegiatan.findMany({
			take: parseInt(limit),
			skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				pura: true,
				user: true,
			},
			where: whereClause,
		});

		return new Response(JSON.stringify(kegiatans));
	} catch (error) {
		return new Response('Could not fetch kegiatan', { status: 500 });
	}
}
