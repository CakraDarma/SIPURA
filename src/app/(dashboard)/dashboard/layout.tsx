import { redirect } from 'next/navigation';

import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { UserAccountNav } from '@/components/UserAccountNav';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import SearchBar from '@/components/SearchBar';
import { MainNavDashboard } from '@/components/MainNavDashboard';
import { db } from '@/lib/db';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const session = await getAuthSession();
	const puraNotActived = await db.pura.findMany({
		where: { actived: false },
	});
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='fixed inset-x-0 top-0 z-40 border-b bg-black-light backdrop-filter backdrop-blur-lg bg-opacity-30'>
				<div className='container flex items-center justify-between h-16 gap-6 py-4 md:gap-4'>
					<MainNavDashboard items={dashboardConfig.dashboardNav} />
					<Link href='/' className='items-center hidden space-x-2 md:flex'>
						<Icons.logo />
						<span className='hidden font-bold sm:inline-block'>
							{siteConfig.name}
						</span>
					</Link>
					{/* search bar */}
					<SearchBar />

					{session?.user ? (
						<UserAccountNav
							user={{
								id: session.user.id,
								name: session.user.name,
								email: session.user.email,
								role: session.user.role,
								image: session.user.image,
							}}
							countPuraIsUnactived={puraNotActived.length}
						/>
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
			<main className='flex flex-col flex-1 w-full mt-24 overflow-hidden'>
				{children}
			</main>
			<Footer />
		</div>
	);
}
