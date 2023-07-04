import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/Button';
import { UserAccountNav } from './UserAccountNav';
import SearchBar from './SearchBar';

import { navConfig } from '@/config/nav';

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<div className='fixed top-0 inset-x-0 h-fit bg-black-light border-b border-zinc-300 z-[10] py-2'>
			<div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
				{/* logo */}
				<Link href='/' className='flex gap-2 items-center'>
					<Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
					<p className='hidden text-primary text-sm font-medium md:block'>
						Breadit
					</p>
				</Link>

				{/* navigation */}
				{navConfig?.length ? (
					<nav className='hidden gap-6 md:flex'>
						{navConfig?.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className={
									'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 md:text-sm text-foreground'
								}
							>
								{item.title}
							</Link>
						))}
					</nav>
				) : null}

				{/* actions */}
				{session?.user ? (
					<UserAccountNav user={session.user} />
				) : (
					<Link href='/sign-in' className={buttonVariants()}>
						Sign In
					</Link>
				)}

				{/* search bar */}
				<SearchBar />
			</div>
		</div>
	);
};

export default Navbar;
