import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
// import { EmptyPlaceholder } from '@/components/empty-placeholder';
// import { PostItem } from '@/components/post-item';
// import { PostCreateButton } from '@/components/post-create-button';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	// const posts = await db.post.findMany({
	// 	where: {
	// 		authorId: session.id,
	// 	},
	// 	select: {
	// 		id: true,
	// 		title: true,
	// 		published: true,
	// 		createdAt: true,
	// 	},
	// 	orderBy: {
	// 		updatedAt: 'desc',
	// 	},
	// });

	return (
		<DashboardShell>
			<DashboardHeader heading='Posts' text='Create and manage posts.'>
				{/* <PostCreateButton /> */}
			</DashboardHeader>
			<div>
				{/* {posts?.length ? (
					<div className='divide-y divide-border rounded-md border'>
						{posts.map((post) => (
							<PostItem key={post.id} post={post} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='post' />
						<EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any posts yet. Start creating content.
						</EmptyPlaceholder.Description>
						<PostCreateButton variant='outline' />
					</EmptyPlaceholder>
				)} */}
			</div>
		</DashboardShell>
	);
}
