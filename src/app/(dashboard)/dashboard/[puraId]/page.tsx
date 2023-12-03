import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';

export const metadata = {
	title: 'Dashboard',
};

interface DashboardPageProps {
	params: {
		puraId: string;
	};
}

export default async function DashboardPage({ params }: DashboardPageProps) {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	return (
		<DashboardShell>
			<div className='ml-6'>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang
						nyaman.'
				/>
			</div>
		</DashboardShell>
	);
}
