'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import UserAuthForm from '@/components/UserAuthForm';
import Link from 'next/link';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignIn({ className, ...props }: SignInProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='Email'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
						/>
						<Label className='sr-only' htmlFor='password'>
							Password
						</Label>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
						/>
					</div>
					<Button disabled={isLoading}>Login</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						ATAU LOGIN MENGGUNAKAN
					</span>
				</div>
			</div>
			<UserAuthForm />
			<p className='px-8 text-center text-sm text-muted-foreground leading-6'>
				Belum memiliki akun?{' '}
				<Link
					href='/sign-up'
					className='underline underline-offset-4 hover:text-primary'
				>
					Daftar
				</Link>{' '}
				atau{' '}
				<Link
					href='/forgot-password'
					className='underline underline-offset-4 hover:text-primary'
				>
					Lupa password
				</Link>
				.
			</p>
		</div>
	);
}

export default SignIn;
