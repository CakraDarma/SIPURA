'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useForm } from 'react-hook-form';
import { ResetValidator } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { reset } from '@/actions/reset';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function ResetPassword({ className, ...props }: SignInProps) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof ResetValidator>>({
		resolver: zodResolver(ResetValidator),
		defaultValues: {
			email: '',
		},
	});

	const { mutate: LoginUser, isPending } = useMutation({
		mutationFn: async (payload: z.infer<typeof ResetValidator>) => {
			reset(payload).then((data) => {
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

	async function onSubmit(data: z.infer<typeof ResetValidator>) {
		const payload: z.infer<typeof ResetValidator> = {
			email: data.email,
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
					</div>
					<Button disabled={isPending}>Kirim Email Verifikasi</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<a
						className='px-2 text-base underline bg-background text-muted-foreground underline-offset-4 hover:text-primary'
						href={'/sign-in'}
					>
						Kembali ke Login
					</a>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
