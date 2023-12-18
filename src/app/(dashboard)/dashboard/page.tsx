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
		redirect(authOptions?.pages?.signIn || '/sign-in');
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
		<div className='container flex flex-col h-full space-y-6 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang
						nyaman.'
				/>

				<div>
					{pura?.length ? (
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 md:flex-row'>
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
						</EmptyPlaceholder>
					)}
				</div>
			</DashboardShell>
		</div>
	);
}
