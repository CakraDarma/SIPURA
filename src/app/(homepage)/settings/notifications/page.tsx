import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { FormEditNotification } from '@/components/form/FormEditNotification';

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
	const session = await getAuthSession();
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	return (
		<div className='container md:py-20 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Notifikasi Piodalan Pura'
					text='Kelola informasi pribadi anda.'
				/>
				<div className='grid gap-10'>
					<FormEditNotification />
				</div>
			</DashboardShell>
		</div>
	);
}
