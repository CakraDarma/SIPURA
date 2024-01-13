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

interface SettingsPageProps {
	params: {
		userId: string;
	};
}

export default async function SettingsPage({ params }: SettingsPageProps) {
	const session = await getAuthSession();
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}
	const user = await db.user.findFirst({
		where: {
			id: params.userId,
		},
	});

	// await new Promise((resolve) => setTimeout(resolve, 7000));

	return (
		<div className='max-w-4xl py-12 mx-auto mt-10'>
			<div className='grid items-start gap-8'>
				<DashboardShell>
					<DashboardHeader
						heading='Profil Akun'
						text='Kelola informasi pengguna'
					/>
					<div className='grid gap-10'>
						<FormEditUser
							user={{
								id: user?.id || '',
								name: user?.name || '',
								image: user?.image || '',
								alamat: user?.alamat || '',
								telepon: user?.telepon || '',
							}}
						/>
					</div>
				</DashboardShell>
			</div>
		</div>
	);
}
