import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TableUser from '@/components/table/TableUser';

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

	const users = await db.user.findMany({});

	return (
		<div className='container flex flex-col h-full space-y-6 max-w-7xl wfull'>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang
						nyaman.'
				/>

				{users?.length ? (
					<div className='overflow-x-auto'>
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 md:flex-row'>
							<TableUser data={users} />
						</div>
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada pengguna</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Tidak ada pengguna pada sistem informasi Pura
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</div>
	);
}
