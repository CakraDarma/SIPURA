import { Metadata } from 'next';
import Link from 'next/link';

import SignIn from '@/components/SignIn';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
	title: 'Autentikasi',
	description: 'Autentikasi User',
};

export default function AuthenticationPage() {
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
			<div className='lg:p-8'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Login Akun
						</h1>
						<p className='text-sm text-muted-foreground'>
							Masukan email dan password untuk login ke akun Anda
						</p>
					</div>
					<SignIn />
				</div>
			</div>
		</div>
	);
}
