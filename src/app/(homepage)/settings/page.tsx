import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { FormEditUser } from '@/components/form/FormEditUser';
import { db } from '@/lib/db';

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
	const session = await getAuthSession();
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}
	const user = await db.user.findFirst({
		where: {
			id: session.user.id,
		},
	});

	// await new Promise((resolve) => setTimeout(resolve, 7000));

	return (
		<div className='container md:py-20 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Profil Akun'
					text='Kelola informasi pribadi anda.'
				/>
				<div className='grid gap-10'>
					<FormEditUser
						user={{
							id: session.user.id,
							name: session.user.name || '',
							image: session.user.image || '',
							alamat: user?.alamat || '',
							telepon: user?.telepon || '',
						}}
					/>
				</div>
			</DashboardShell>
		</div>
	);
}
