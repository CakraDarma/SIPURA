import EditorOutput from '@/components/EditorOutput';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { formatTimeToNow } from '@/lib/utils';
import { CachedPost } from '@/types/redis';
import { Kegiatan, User, Vote } from '@prisma/client';
import { notFound } from 'next/navigation';

interface SubRedditPostPageProps {
	params: {
		postId: string;
	};
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
	const cachedPost = (await redis.hgetall(
		`post:${params.postId}`
	)) as CachedPost;

	let post: (Kegiatan & { votes: Vote[]; author: User }) | null = null;

	if (!cachedPost) {
		post = await db.kegiatan.findFirst({
			where: {
				id: params.postId,
			},
			include: {
				votes: true,
				author: true,
			},
		});
	}

	if (!post && !cachedPost) return notFound();

	return (
		<div>
			<div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between'>
				<div className='sm:w-0 w-full flex-1 bg-white p-4 rounded-sm'>
					<p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
						Dikirim oleh {post?.author.username ?? cachedPost.authorUsername}{' '}
						{formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
					</p>
					<h1 className='text-xl font-semibold py-2 leading-6 text-gray-900'>
						{post?.title ?? cachedPost.title}
					</h1>

					<EditorOutput content={post?.content ?? cachedPost.content} />
				</div>
			</div>
		</div>
	);
};

export default SubRedditPostPage;
