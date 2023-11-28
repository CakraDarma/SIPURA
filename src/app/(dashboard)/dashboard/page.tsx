import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
// import { EmptyPlaceholder } from '@/components/empty-placeholder';
// import { PostItem } from '@/components/kegiatan-item';
// import { PostCreateButton } from '@/components/kegiatan-create-button';
import DashboardHeader from '@/components/header';
import DashboardShell from '@/components/shell';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	// const kegiatans = await db.kegiatan.findMany({
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
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang
						nyaman.'
			/>
			<div>
				{/* {kegiatans?.length ? (
					<div className='divide-y divide-border rounded-md border'>
						{kegiatans.map((kegiatan) => (
							<PostItem key={kegiatan.id} kegiatan={kegiatan} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>No kegiatans created</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							You don&apos;t have any kegiatans yet. Start creating content.
						</EmptyPlaceholder.Description>
						<PostCreateButton variant='outline' />
					</EmptyPlaceholder>
				)} */}
			</div>
		</DashboardShell>
	);
}
