import { redirect } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';
import FooterDashboard from '@/components/FooterDashboard';

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

	return (
		<div className='flex flex-col min-h-screen space-y-6'>
			<header className='sticky top-0 z-40 border-b bg-black-dark'>
				<div className='container flex items-center justify-between h-16 py-4'>
					<MainNav items={dashboardConfig.dashboardNav} />
					<UserAccountNav user={session.user} />
				</div>
			</header>
			{children}
			{/* <FooterDashboard className='border-t' /> */}
		</div>
	);
}
