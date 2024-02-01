'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import UserAuthForm from '@/components/UserAuthForm';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginValidator } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/actions/login';
import { toast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignIn({ className, ...props }: SignInProps) {
	const searchParams = useSearchParams();
	// const callbackUrl = searchParams.get('callbackUrl');
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email atau password salah!'
			: '';

	if (urlError) {
		toast({
			title: urlError,
			description: 'Tidak dapat melakukan login.',
			variant: 'destructive',
		});
	}

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof LoginValidator>>({
		resolver: zodResolver(LoginValidator),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { mutate: LoginUser, isPending } = useMutation({
		mutationFn: async (payload: z.infer<typeof LoginValidator>) => {
			login(payload).then((data) => {
				if (data?.error) {
					return toast({
						title: data.error,
						description: 'Tidak dapat melakukan login.',
						variant: 'destructive',
					});
				} else if (data?.success) {
					return toast({
						title: data?.success,
						description: 'Silahkan periksa email Anda',
					});
				} else {
					signIn('credentials', {
						email: payload.email,
						password: payload.password,
					});
				}
			});
		},
	});

	async function onSubmit(data: z.infer<typeof LoginValidator>) {
		const payload: z.infer<typeof LoginValidator> = {
			email: data.email,
			password: data.password,
		};
		LoginUser(payload);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
							disabled={isPending}
							{...register('email')}
						/>
						{errors?.email && (
							<p className='px-1 text-xs text-red-600'>
								{errors.email.message}
							</p>
						)}
						<Label className='sr-only' htmlFor='password'>
							Password
						</Label>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
							{...register('password')}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>
					<Button disabled={isPending}>Login</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='px-2 bg-background text-muted-foreground'>
						ATAU LOGIN MENGGUNAKAN
					</span>
				</div>
			</div>
			<UserAuthForm />
			<p className='px-8 text-sm leading-6 text-center text-muted-foreground'>
				Belum memiliki akun?{' '}
				<Link
					href='/sign-up'
					className='underline underline-offset-4 hover:text-primary'
				>
					Daftar
				</Link>{' '}
				atau{' '}
				<Link
					href='/reset-password'
					className='underline underline-offset-4 hover:text-primary'
				>
					lupa password
				</Link>
				.
			</p>
		</div>
	);
}

export default SignIn;
