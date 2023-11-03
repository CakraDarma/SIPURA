import { db } from '@/lib/db';
import PostFeed from '../PostFeed';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';

const GeneralFeed = async () => {
	const kegiatans = await db.kegiatan.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			votes: true,
			author: true,
			comments: true,
			pura: true,
		},
		take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
	});

	return <PostFeed initialPosts={kegiatans} />;
};

export default GeneralFeed;
