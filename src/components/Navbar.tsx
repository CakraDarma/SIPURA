import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { UserAccountNav } from './UserAccountNav';
import SearchBar from './SearchBar';

import { navConfig } from '@/config/nav';
import { cn } from '@/lib/utils';

const Navbar = async () => {
	const session = await getAuthSession();
	return (
		<div className='fixed top-0 inset-x-0 h-fit bg-black-light z-50 py-4 backdrop-filter backdrop-blur-lg bg-opacity-30'>
			<div className='container max-w-7xl h-full flex items-center justify-between gap-2'>
				{/* logo */}
				<Link href='/' className='flex gap-2 items-center'>
					<Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
					<p className='hidden text-primary text-lg font-medium md:block text-white'>
						Logo
					</p>
				</Link>

				{/* navigation */}
				{navConfig?.length ? (
					<nav className='hidden gap-6 md:flex'>
						{navConfig?.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className={cn(
									'flex items-center',
									'text-white  text-sm',
									' hover:border-b-2 border-gray-50'
								)}
							>
								{item.title}
							</Link>
						))}
					</nav>
				) : null}

				{/* search bar */}
				<SearchBar />

				{/* actions */}
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
		</div>
	);
};

export default Navbar;
