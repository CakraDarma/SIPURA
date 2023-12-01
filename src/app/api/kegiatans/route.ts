import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
	const url = new URL(req.url);

	const session = await getAuthSession();

	let followedCommunitiesIds: string[] = [];

	if (session) {
		const followedCommunities = await db.userRole.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				pura: true,
			},
		});

		followedCommunitiesIds = followedCommunities.map((sub) => sub.pura.id);
	}

	try {
		const { limit, page, subredditName } = z
			.object({
				limit: z.string(),
				page: z.string(),
				subredditName: z.string().nullish().optional(),
			})
			.parse({
				subredditName: url.searchParams.get('subredditName'),
				limit: url.searchParams.get('limit'),
				page: url.searchParams.get('page'),
			});

		let whereClause = {};

		if (subredditName) {
			whereClause = {
				pura: {
					name: subredditName,
				},
			};
		} else if (session) {
			whereClause = {
				pura: {
					id: {
						in: followedCommunitiesIds,
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
				votes: true,
				user: true,
				comments: true,
			},
			where: whereClause,
		});

		return new Response(JSON.stringify(kegiatans));
	} catch (error) {
		return new Response('Could not fetch kegiatans', { status: 500 });
	}
}
