// import MiniCreatePost from '@/components/MiniCreatePost';
import PostFeed from '@/components/PostFeed';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
// import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

const page = async ({ params }: PageProps) => {
	const { slug } = params;

	// const session = await getAuthSession();

	const pura = await db.pura.findFirst({
		where: { name: slug },
		include: {
			kegiatans: {
				include: {
					author: true,
					votes: true,
					comments: true,
					pura: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: INFINITE_SCROLL_PAGINATION_RESULTS,
			},
		},
	});

	if (!pura) return notFound();

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Kegiatan Pura'
				text='Buat dan kelola kegiatan.'
			/>
			<PostFeed initialPosts={pura.kegiatans} subredditName={pura.name} />
		</DashboardShell>
		// <>
		// 	<h1 className='font-bold text-3xl md:text-4xl h-14'>Pura {pura.name}</h1>
		// 	{/* <MiniCreatePost session={session} /> */}

		// </>
	);
};

export default page;
