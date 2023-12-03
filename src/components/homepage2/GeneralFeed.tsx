import { db } from '@/lib/db';
import KegiatanFeed from '../KegiatanFeed';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';

const GeneralFeed = async () => {
	const kegiatans = await db.kegiatan.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			user: true,
			pura: true,
		},
		take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
	});

	return <KegiatanFeed initialKegiatans={kegiatans} />;
};

export default GeneralFeed;
