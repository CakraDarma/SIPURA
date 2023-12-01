import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
// import { EmptyPlaceholder } from '@/components/empty-placeholder';
// import { PostItem } from '@/components/kegiatan-item';
// import { PostCreateButton } from '@/components/kegiatan-create-button';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import CardPura from '@/components/CardPura';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	const pura = await db.pura.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			name: 'asc',
		},
	});

	return (
		<DashboardShell>
			<div className='ml-6'>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang
						nyaman.'
				/>
			</div>
			<div>
				{pura?.length ? (
					<div className='flex-col items-center justify-center flex md:flex-row gap-6'>
						{pura.map((pura, index) => (
							<CardPura key={index} pura={pura} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada Pura</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki Pura yang tersedia. Silahkan tambahkan Pura
							terlebih dahulu
						</EmptyPlaceholder.Description>
						{/* <PostCreateButton variant='outline' /> */}
					</EmptyPlaceholder>
				)}
			</div>
		</DashboardShell>
	);
}
