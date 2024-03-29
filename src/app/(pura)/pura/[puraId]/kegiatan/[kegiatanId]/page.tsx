import BackButton from '@/components/BackButton';
import EditorOutput from '@/components/EditorOutput';
import { db } from '@/lib/db';
import { formatTimeToNow } from '@/lib/utils';
import { Kegiatan, User } from '@prisma/client';
import { notFound } from 'next/navigation';

interface KegiatanPuraPageProps {
	params: {
		kegiatanId: string;
	};
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const KegiatanPuraPage = async ({ params }: KegiatanPuraPageProps) => {
	let post: (Kegiatan & { user: User }) | null = null;

	post = await db.kegiatan.findFirst({
		where: {
			id: params.kegiatanId,
		},
		include: {
			user: true,
		},
	});

	if (!post) return notFound();

	return (
		<div className='container py-10 max-w-7xl'>
			<div className='flex flex-col items-center justify-between h-full sm:flex-row sm:items-start'>
				<div className='flex-1 w-full p-4 bg-white rounded-sm sm:w-0'>
					<BackButton />
					<p className='mt-1 text-sm text-gray-500 truncate max-h-40'>
						Dikirim oleh {post?.user.name}{' '}
						{formatTimeToNow(new Date(post?.createdAt))}
					</p>
					<h1 className='pt-4 text-2xl font-semibold leading-6 text-black pb-7'>
						{post?.title}
					</h1>

					<EditorOutput content={post?.content} />
				</div>
			</div>
		</div>
	);
};

export default KegiatanPuraPage;
