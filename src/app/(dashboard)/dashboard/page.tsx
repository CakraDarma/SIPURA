import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import CardPuras from '@/components/CardPuras';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect('/sign-in');
	}

	const pura = await db.pura.findMany({
		where: {
			subscribers: {
				some: {
					userId: {
						equals: session.user.id,
					},
				},
			},
			actived: true,
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

				{pura?.length ? (
					<div>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/pura/create`}
						>
							Tambah
						</Link>
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 md:flex-row'>
							{pura.map((pura, index) => (
								<CardPuras
									key={index}
									pura={pura}
									link={`dashboard/${pura.id}`}
								/>
							))}
						</div>
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada Pura</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki Pura yang tersedia. Silahkan tambahkan Pura
							terlebih dahulu
						</EmptyPlaceholder.Description>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/pura/create`}
						>
							Tambah
						</Link>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</div>
	);
}
