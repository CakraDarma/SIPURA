import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TablePura from '@/components/table/TablePura';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect('/sign-in');
	} else if (session.user.role != 'ADMIN') {
		redirect('/');
	}

	const pura = await db.pura.findMany({
		where: {
			actived: false,
		},
	});

	return (
		<div className='container flex flex-col h-full space-y-6 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang
						nyaman.'
				/>

				{pura?.length ? (
					<div>
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 overflow-x-scroll md:flex-row sm:overflow-auto'>
							<TablePura data={pura} />
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
