import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { UserNameForm } from '@/components/UserNameForm';

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}
	await new Promise((resolve) => setTimeout(resolve, 7000));

	return (
		<div className='max-w-4xl mx-auto py-12'>
			<div className='grid items-start gap-8'>
				<DashboardShell>
					<DashboardHeader
						heading='Settings'
						text='Manage account and website settings.'
					/>
					<div className='grid gap-10'>
						<UserNameForm
							user={{
								id: session.user.id,
								name: session.user.name || '',
							}}
						/>
					</div>
				</DashboardShell>
			</div>
		</div>
	);
}
