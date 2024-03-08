import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TablePendingPura from '@/components/table/TablePendingPura';
import BackButton from '@/components/BackButton';

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
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader
					heading='Pengajuan Pura'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang
						nyaman.'
				/>

				<p className='text-yellow-400 body-2 '>
					Pengajuan Pura Anda sedang diverifikasi oleh admin
				</p>

				{pura?.length ? (
					<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 overflow-x-scroll md:flex-row sm:overflow-auto'>
						<TablePendingPura data={pura} />
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
