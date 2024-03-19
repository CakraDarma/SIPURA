'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import { ChangePasswordValidator } from '@/lib/validators/user';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { changePassword } from '@/actions/change-password';

type FormData = z.infer<typeof ChangePasswordValidator>;

export function FormChangePassword() {
	const router = useRouter();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(ChangePasswordValidator),
	});

	const { mutate: updateUsername, isPending } = useMutation({
		mutationFn: async (payload: FormData) => {
			const { data } = await axios.patch(`/api/user/change-password`, payload);
			return data;
		},
		onError: (err) => {
			reset();
			if (err instanceof AxiosError) {
				if (err.response?.status === 402) {
					return toast({
						title: 'Password lama salah',
						description: 'Silakan masukkan password lama yang benar',
						variant: 'destructive',
					});
				}
			}
			return toast({
				title: 'Terjadi kesalahan',
				description: 'Password Anda tidak dapat dirubah. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Password Anda berhasil dirubah.',
			});
			reset();
			router.refresh();
		},
	});

	return (
		<form onSubmit={handleSubmit((e) => updateUsername(e))}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='password'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Password Lama<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('password')}
							type='password'
							name='password'
							id='password'
							placeholder='Masukkan password lama'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.password && (
							<p className='px-1 text-xs text-red-600'>
								{errors.password.message}
							</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='newPassword'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Password Baru<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('newPassword')}
							type='password'
							name='newPassword'
							id='newPassword'
							placeholder='Masukkan password baru'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.newPassword && (
							<p className='px-1 text-xs text-red-600'>
								{errors.newPassword.message}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='flex justify-end gap-4 mt-20'>
				<Button
					disabled={isPending}
					variant='subtle'
					onClick={() => router.back()}
					type='button'
				>
					Batalkan
				</Button>
				<Button isLoading={isPending}>Simpan</Button>
			</div>
		</form>
	);
}
