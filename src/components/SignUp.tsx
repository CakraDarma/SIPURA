import UserAuthForm from '@/components/SignIn';
import Link from 'next/link';
const SignUp = () => {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
			<div className='flex flex-col space-y-2 text-center'>
				<h1 className='text-2xl font-semibold tracking-tight'>Daftar Akun</h1>
				<p className='text-sm max-w-xs mx-auto'>.</p>
			</div>
			<UserAuthForm />
			<p className='px-8 text-center text-sm text-muted-foreground'>
				Sudah punya akun?{' '}
				<Link
					href='/sign-in'
					className='hover:text-brand text-sm underline underline-offset-4'
				>
					Masuk
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
