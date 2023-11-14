import { redirect } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/main-nav';
import { UserAccountNav } from '@/components/UserAccountNav';
import { Link } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { DashboardNav } from '@/components/nav';
import SearchBar from '@/components/SearchBar';

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
		<div className='flex min-h-screen flex-col'>
			<header className='fixed inset-x-0 top-0 z-40 border-b bg-black-light backdrop-filter backdrop-blur-lg bg-opacity-30'>
				<div className='container flex h-16 items-center justify-between py-4'>
					<MainNav items={dashboardConfig.mainNav} />

					{/* search bar */}
					<SearchBar />

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
			<main className='flex w-full flex-1 flex-col overflow-hidden'>
				{children}
			</main>
		</div>
	);
}
