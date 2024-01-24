'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useForm } from 'react-hook-form';
import { NewPasswordValidator } from '@/lib/validators/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { newPassword } from '@/actions/new-password';
import { useRouter, useSearchParams } from 'next/navigation';

interface SignInProps extends React.HTMLAttributes<HTMLDivElement> {}

function NewPassword({ className, ...props }: SignInProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<z.infer<typeof NewPasswordValidator>>({
		resolver: zodResolver(NewPasswordValidator),
		defaultValues: {
			password: '',
		},
	});

	const { mutate: resetPassword, isPending } = useMutation({
		mutationFn: async (payload: z.infer<typeof NewPasswordValidator>) => {
			newPassword(payload, token).then((data) => {
				if (data.error) {
					toast({
						title: data.error,
						description: 'Tidak dapat merubah password Anda.',
						variant: 'destructive',
					});
				} else {
					toast({
						title: data.success,
						description: 'Password berhasil dirubah',
					});

					router.push(`/`);
				}
			});
		},
	});

	async function onSubmit(data: z.infer<typeof NewPasswordValidator>) {
		const payload: z.infer<typeof NewPasswordValidator> = {
			password: data.password,
		};
		resetPassword(payload);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='password'>
							Password
						</Label>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							autoCapitalize='none'
							autoComplete='password'
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
					<Button disabled={isPending}>Reset Password</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<a
						className='px-2 text-sm underline bg-background text-muted-foreground underline-offset-4 hover:text-primary'
						href={'/sign-in'}
					>
						Kembali ke Login
					</a>
				</div>
			</div>
		</div>
	);
}

export default NewPassword;
