import Link from 'next/link';
import { Icons } from '@/components/Icons';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const session = await getAuthSession();

	if (session) {
		redirect('/');
	}
	const divStyle = {
		backgroundImage: `url(/images/auth-page.jpg)`,
	};

	return (
		<div className='container relative flex-col items-center justify-center hidden h-screen max-w-7xl md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex'>
				<div
					className='absolute inset-0 object-cover bg-center bg-cover'
					style={divStyle}
				/>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<Link href='/' className='flex items-center gap-2'>
						<Icons.logo className='w-8 h-8 sm:h-6 sm:w-6' />
						<h4>SIPura</h4>
					</Link>
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>
							&ldquo;Sistem informasi dan virtual tour pura memperkaya
							pengalaman pengunjung dengan informasi pura yang mendalam dan
							mempermudah manajemen informasi pura.&rdquo;
						</p>
					</blockquote>
				</div>
			</div>
			{children}
		</div>
	);
}
