import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TablePendingPura from '@/components/table/TablePendingPura';

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
			userId: session.user.id,
		},
	});

	return (
		<div className='container flex flex-col h-full space-y-6 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Pengajuan Pura'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang
						nyaman.'
				/>

				{pura?.length ? (
					<div>
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 md:flex-row'>
							<TablePendingPura data={pura} />
						</div>
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada pura</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Tidak ada pura baru yang ditambahkan untuk dikonfirmasi oleh Anda
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</div>
	);
}
