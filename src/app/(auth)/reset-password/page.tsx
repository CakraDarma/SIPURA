import { Metadata } from 'next';

import ResetPassword from '@/components/form/ResetPassword';

export const metadata: Metadata = {
	title: 'Sign In',
	description: 'Sign In User',
};

export default function AuthenticationPage() {
	return (
		<div className='lg:p-8'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Reset Password
					</h1>
					<p className='text-sm text-muted-foreground'>
						Masukkan email Anda untuk melakukan reset password
					</p>
				</div>
				<ResetPassword />
			</div>
		</div>
	);
}
