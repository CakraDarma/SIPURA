import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { FormChangePassword } from '@/components/form/FormChangePassword';

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
					heading='Keamanan Akun'
					text='Kelola informasi pribadi anda.'
				/>
				<div className='grid gap-10'>
					<FormChangePassword />
				</div>
			</DashboardShell>
		</div>
	);
}
