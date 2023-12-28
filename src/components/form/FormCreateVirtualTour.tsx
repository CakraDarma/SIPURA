'use client';

import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { VirtualTourValidator } from '@/lib/validators/virtualTour';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/ui/Button';

type FormData = z.infer<typeof VirtualTourValidator>;

export default function FormCreateVirtualTour() {
	const router = useRouter();
	const params = useParams();
	const [preview, setPreview] = useState<string>();
	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(VirtualTourValidator),
		defaultValues: {
			puraId: params.puraId,
		},
	});

	const { mutate: createVirtualTour, isPending } = useMutation({
		mutationFn: async ({ virtualTour, puraId, nama }: FormData) => {
			const payload = {
				nama,
				virtualTour,
				puraId,
			};
			const { data } = await axios.post('/api/pura/virtual-tour', payload);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 422) {
					return toast({
						title: 'Input tidak valid.',
						description: 'Silakan periksa kembali input Anda.',
						variant: 'destructive',
					});
				}

				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			toast({
				title: 'Terjadi kesalahan.',
				description: 'Tidak dapat membuat Virtual Tour.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menambahkan Virtual Tour',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/virtual-tour`);
		},
	});
	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			nama: data.nama,
			virtualTour: data.virtualTour,
			puraId: params.puraId,
		};
		createVirtualTour(payload);
	}

	return (
		<div>
			{preview && (
				<div className='flex flex-col items-center justify-center'>
					<iframe
						src={`${preview}`}
						width='600'
						height='400'
						frameBorder='0'
						allowFullScreen
					></iframe>
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-5'>
					<label
						htmlFor='nama'
						className='mb-3 block text-base font-medium text-[#07074D]'
					>
						Nama<span className='text-red-500'>*</span>
					</label>
					<input
						{...register('nama')}
						type='text'
						name='nama'
						id='nama'
						placeholder='Masukan nama virtual tour'
						min='0'
						className='w-full appearance-none rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
					/>
					{errors?.nama && (
						<p className='px-1 text-xs text-red-600'>{errors.nama.message}</p>
					)}
				</div>
				<div className='mb-5'>
					<label
						htmlFor='virtualTour'
						className='mb-3 block text-base font-medium text-[#07074D]'
					>
						Virtual Tour<span className='text-red-500'>*</span>
					</label>
					<input
						{...register('virtualTour')}
						type='text'
						name='virtualTour'
						id='virtualTour'
						placeholder='Masukan url virtual tour'
						min='0'
						className='w-full appearance-none rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
					/>
					{errors?.virtualTour && (
						<p className='px-1 text-xs text-red-600'>
							{errors.virtualTour.message}
						</p>
					)}
				</div>
				<div className='flex justify-end gap-4'>
					<Button
						disabled={isPending}
						variant='subtle'
						onClick={() => router.back()}
					>
						Batalkan
					</Button>
					<Button
						className='text-white bg-blue-500'
						variant='subtle'
						onClick={(e) => {
							e.preventDefault();
							setPreview(getValues('virtualTour'));
						}}
					>
						Preview
					</Button>
					<Button isLoading={isPending}>Buat VirtualTour</Button>
				</div>
			</form>
		</div>
	);
}
