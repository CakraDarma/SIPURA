'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import UserAuthForm from '@/components/UserAuthForm';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RegisterValidator } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { register as userRegister } from '@/actions/register';
interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignIn({ className, ...props }: SignInProps) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof RegisterValidator>>({
		resolver: zodResolver(RegisterValidator),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});

	const { mutate: registerUser, isPending } = useMutation({
		mutationFn: async (payload: z.infer<typeof RegisterValidator>) => {
			userRegister(payload).then((data) => {
				if (data.error) {
					toast({
						title: data.error,
						description: 'Tidak dapat melakukan registrasi pengguna.',
						variant: 'destructive',
					});
				} else {
					toast({
						title: data.success,
						description: 'Silahkan periksa email Anda',
					});
				}
			});
		},
	});

	async function onSubmit(data: z.infer<typeof RegisterValidator>) {
		const payload: z.infer<typeof RegisterValidator> = {
			name: data.name,
			alamat: data.alamat,
			email: data.email,
			password: data.password,
			telepon: data.telepon,
		};
		registerUser(payload);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='nama'>
							Nama
						</Label>
						<Input
							id='nama'
							placeholder='Nama'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
							{...register('name')}
						/>
						{errors?.name && (
							<p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
						)}
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							{...register('email')}
							id='email'
							placeholder='Email'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isPending}
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
							{...register('password')}
							id='password'
							placeholder='Password'
							type='password'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
						<Label className='sr-only' htmlFor='confirm-password'>
							Konfirmasi Password
						</Label>
						<Input
							id='confirm-password'
							placeholder='Konfirmasi Password'
							type='password'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
						<Label className='sr-only' htmlFor='alamat'>
							Alamat
						</Label>
						<Input
							{...register('alamat')}
							id='alamat'
							placeholder='Alamat'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
						/>
						{errors?.alamat && (
							<p className='px-1 text-xs text-red-600'>
								{errors.alamat.message}
							</p>
						)}
						<Label className='sr-only' htmlFor='telepon'>
							Telepon
						</Label>
						<Input
							{...register('telepon')}
							id='telepon'
							placeholder='Telepon'
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isPending}
						/>
						{errors?.telepon && (
							<p className='px-1 text-xs text-red-600'>
								{errors.telepon.message}
							</p>
						)}
					</div>
					<Button isLoading={isPending}>Register</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='px-2 bg-background text-muted-foreground'>
						ATAU REGISTER MENGGUNAKAN
					</span>
				</div>
			</div>
			<UserAuthForm />
			<p className='px-8 text-sm leading-6 text-center text-muted-foreground'>
				Sudah memiliki akun?{' '}
				<Link
					href='/sign-in'
					className='underline underline-offset-4 hover:text-primary'
				>
					login
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
