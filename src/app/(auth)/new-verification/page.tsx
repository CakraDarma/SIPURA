import { Metadata } from 'next';

import NewVerification from '@/components/form/NewVerification';

export const metadata: Metadata = {
	title: 'Verification Email',
	description: 'Verification Email User User',
};

export default function AuthenticationPage() {
	return (
		<div className='lg:p-8'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight md:text-4xl'>
						Verifikasi Email
					</h1>
					<p className='text-sm text-muted-foreground md:text-lg'>
						Hasil verifikasi email yang telah dikirimkan
					</p>
				</div>
				<NewVerification />
			</div>
		</div>
	);
}
