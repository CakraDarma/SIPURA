import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import PostFeed from '../PostFeed';
import { notFound } from 'next/navigation';

const CustomFeed = async () => {
	const session = await getAuthSession();

	// only rendered if session exists, so this will not happen
	if (!session) return notFound();

	const followedCommunities = await db.subscription.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			pura: true,
		},
	});

	const kegiatans = await db.kegiatan.findMany({
		where: {
			pura: {
				name: {
					in: followedCommunities.map((sub) => sub.pura.name),
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			votes: true,
			author: true,
			comments: true,
			pura: true,
		},
		take: INFINITE_SCROLL_PAGINATION_RESULTS,
	});

	return <PostFeed initialPosts={kegiatans} />;
};

export default CustomFeed;
