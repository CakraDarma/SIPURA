'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import { NotificationValidator } from '@/lib/validators/user';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof NotificationValidator>;

export function FormEditNotification() {
	const [reminder, setReminder] = useState<number>();
	const router = useRouter();

	useEffect(() => {
		const savedDataString: string | null = localStorage.getItem(
			'piodalanNotifications'
		);
		const savedData: { ids: string[]; reminder: number } = savedDataString
			? JSON.parse(savedDataString)
			: { ids: [], reminder: 7 };
		setReminder(savedData.reminder);
	}, [reminder]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(NotificationValidator),
	});

	useEffect(() => {
		if (reminder) {
			setValue('notifikasiPiodalan', reminder);
		}
	}, [reminder, setValue]);

	const { mutate: updateNotifikasiPiodalan, isPending } = useMutation({
		mutationFn: async ({ notifikasiPiodalan }: FormData) => {
			try {
				const savedDataString: string | null = localStorage.getItem(
					'piodalanNotifications'
				);
				const savedData: { ids: string[]; reminder: number } = savedDataString
					? JSON.parse(savedDataString)
					: { ids: [], reminder: 7 };

				savedData.reminder = notifikasiPiodalan;
				localStorage.setItem(
					'piodalanNotifications',
					JSON.stringify(savedData)
				);
			} catch (error) {
				throw new Error('Gagal memperbarui nilai reminder dalam local storage');
			}
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Data Anda tidak dapat dirubah. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Data Anda berhasil dirubah.',
			});
			router.refresh();
			window.location.reload();
		},
	});

	async function onSubmit(data: FormData) {
		const payload: FormData = {
			notifikasiPiodalan: Number(data.notifikasiPiodalan),
		};
		updateNotifikasiPiodalan(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='notifikasiPiodalan'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Notifikasi Piodalan (Hari)<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('notifikasiPiodalan', {
								valueAsNumber: true,
							})}
							type='number'
							inputMode='numeric'
							name='notifikasiPiodalan'
							id='notifikasiPiodalan'
							placeholder='Masukkan nomor notifikasiPiodalan'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.notifikasiPiodalan && (
							<p className='px-1 text-xs text-red-600'>
								{errors.notifikasiPiodalan.message}
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
