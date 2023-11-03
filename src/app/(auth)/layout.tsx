import Link from 'next/link';
import { Icons } from '@/components/icons';

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	const divStyle = {
		backgroundImage: `url(/images/hero.png)`,
	};
	return (
		<div className='container max-w-7xl relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
				<div
					className='absolute inset-0  object-cover bg-center bg-cover'
					style={divStyle}
				/>
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<Link href='/' className='flex gap-2 items-center'>
						<Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
						<h4>Si Pura</h4>
					</Link>
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>
							&ldquo;Sistem informasi dan virtual tour Pura memperkaya
							pengalaman pengunjung dengan informasi Pura yang mendalam dan
							mempermudah pengelolaan Pura.&rdquo;
						</p>
					</blockquote>
				</div>
			</div>
			{children}
		</div>
	);
}
