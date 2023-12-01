import { redirect } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/login');
	}

	console.log(session.user);
	return (
		<div className='flex min-h-screen flex-col space-y-6'>
			<header className='sticky top-0 z-40 border-b bg-black-dark'>
				<div className='container flex h-16 items-center justify-between py-4'>
					<MainNav items={dashboardConfig.dashboardNav} />
					<UserAccountNav user={session.user} />
				</div>
			</header>
			{children}
		</div>
	);
}
