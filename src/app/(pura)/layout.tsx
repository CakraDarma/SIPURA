import { dashboardConfig } from '@/config/dashboard';
import { getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

interface DashboardLayoutProps {
	children?: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const session = await getAuthSession();

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='fixed inset-x-0 top-0 z-40 border-b bg-black-light backdrop-filter backdrop-blur-lg bg-opacity-30'>
				<div className='container flex items-center justify-between h-16 gap-6 py-4 md:gap-4'>
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
			<main className='flex flex-col flex-1 w-full overflow-hidden'>
				{children}
			</main>
			<Footer />
		</div>
	);
}
