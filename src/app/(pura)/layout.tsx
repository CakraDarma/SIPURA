import { dashboardConfig } from '@/config/dashboard';
import { getAuthSession } from '@/lib/auth';
import { MainNav } from '@/components/MainNav';
import { UserAccountNav } from '@/components/UserAccountNav';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { db } from '@/lib/db';

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
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='fixed inset-x-0 top-0 z-40 border-b bg-black-light backdrop-filter backdrop-blur-lg bg-opacity-30'>
				<div className='container flex items-center justify-between h-16 gap-6 py-4 md:gap-4'>
					<MainNav items={dashboardConfig.mainNav} />

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
			<main className='flex flex-col flex-1 w-full overflow-hidden'>
				{children}
			</main>
			<Footer />
		</div>
	);
}
