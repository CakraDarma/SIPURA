import { notFound, redirect } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/main-nav';
import { UserAccountNav } from '@/components/UserAccountNav';
import { Link } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { DashboardNav } from '@/components/nav';

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
		<div className='flex min-h-screen flex-col space-y-6'>
			<header className='sticky top-0 z-40 border-b bg-background'>
				<div className='container flex h-16 items-center justify-between py-4'>
					<MainNav items={dashboardConfig.mainNav} />
					{session?.user ? (
						<UserAccountNav user={session.user} />
					) : (
						<Link
							href='/sign-in'
							className={cn(
								'text-white text-sm ',
								'flex items-center justify-center gap-1',
								'hover:border-b-2 border-gray-50'
							)}
						>
							Login
							<Icons.user className='text-white' />
						</Link>
					)}
				</div>
			</header>
			<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
				<aside className='hidden w-[200px] flex-col md:flex'>
					<DashboardNav items={dashboardConfig.sidebarNav} />
				</aside>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					{children}
				</main>
			</div>
		</div>
	);
}
