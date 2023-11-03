import { Metadata } from 'next';

import SignIn from '@/components/SignIn';

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign In User',
};

export default function AuthenticationPage() {
	return (
		<div className='lg:p-8'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>Login Akun</h1>
					<p className='text-sm text-muted-foreground'>
						Masukan email dan password untuk login ke akun Anda
					</p>
				</div>
				<SignIn />
			</div>
		</div>
	);
}
