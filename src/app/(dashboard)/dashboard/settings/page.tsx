import { redirect } from 'next/navigation';

import { authOptions, getAuthSession } from '@/lib/auth';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { UserNameForm } from '@/components/UserNameForm';

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Settings'
				text='Manage account and website settings.'
			/>
			<div className='grid gap-10'>
				<UserNameForm
					user={{
						id: session.user.id,
						username: session.user.username || '',
					}}
				/>
			</div>
		</DashboardShell>
	);
}
