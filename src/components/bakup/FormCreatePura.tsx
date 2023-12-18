'use client';

import React from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { PuraValidator } from '@/lib/validators/pura';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/Button';
import { CategoryPura } from '@prisma/client';
import { EditorCreatePura } from './EditorCreatePura';

type FormData = z.infer<typeof PuraValidator>;

export default function FormCreatePura() {
	const listKategori = [
		{
			id: 1,
			kategori: 'Kawitan',
			value: 'KAWITAN',
		},
		{
			id: 2,
			kategori: 'Swagina',
			value: 'SWAGINA',
		},
		{
			id: 3,
			kategori: 'Kahyangan Desa',
			value: 'KAHYANGAN_DESA',
		},
		{
			id: 4,
			kategori: 'Kahyangan Jagat',
			value: 'KAHYANGAN_JAGAT',
		},
	];

	const router = useRouter();
	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(PuraValidator),
		defaultValues: {},
	});

	const { mutate: postPura, isLoading } = useMutation({
		mutationFn: async ({
			alamat,
			kategori,
			name,
			piodalan,
			tahunBerdiri,
			konten,
		}: FormData) => {
			const payload = {
				alamat,
				kategori,
				name,
				piodalan,
				tahunBerdiri,
				konten,
			};
			const { data } = await axios.post('/api/pura', payload);
			return data as string;
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast({
						title: 'Pura sudah ada.',
						description: 'Silakan pilih nama yang berbeda',
						variant: 'destructive',
					});
				}

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
				description: 'Tidak dapat membuat pura.',
				variant: 'destructive',
			});
		},
		onSuccess: (data) => {
			console.log(data);
			router.push(`/dashboard`);
		},
	});

	function receiveContent(data: { title: string; content?: any }) {
		console.log(data);
		setValue('konten', data.content);
	}
	return (
		<form onSubmit={handleSubmit((e) => postPura(e))}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='name'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Nama Pura<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('name')}
							type='text'
							name='name'
							id='name'
							placeholder='Masukan nama Pura'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.name && (
							<p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='tahunBerdiri'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Tahun Berdiri<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('tahunBerdiri', {
								valueAsNumber: true,
							})}
							type='number'
							name='tahunBerdiri'
							id='tahunBerdiri'
							placeholder='Masukan Tahun Berdiri Pura'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.tahunBerdiri && (
							<p className='px-1 text-xs text-red-600'>
								{errors.tahunBerdiri.message}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='alamat'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Alamat<span className='text-red-500'>*</span>
				</label>
				<input
					{...register('alamat')}
					type='text'
					name='alamat'
					id='alamat'
					placeholder='Masukan Alamat Pura'
					min='0'
					className='w-full appearance-none rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
				/>
				{errors?.alamat && (
					<p className='px-1 text-xs text-red-600'>{errors.alamat.message}</p>
				)}
			</div>

			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='piodalan'
							className='mb-3 block text-base font-medium texpiodalant-[#07074D]'
						>
							piodalan<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('piodalan')}
							type='text'
							name='piodalan'
							id='piodalan'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.piodalan && (
							<p className='px-1 text-xs text-red-600'>
								{errors.piodalan.message}
							</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='kategori'
							className='mb-3 block text-base font-medium texpiodalant-[#07074D]'
						>
							Kategori Pura<span className='text-red-500'>*</span>
						</label>
						<select
							id='kategori'
							// @ts-ignore
							onChange={(e) => setValue('kategori', e.target.value)}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						>
							<option value='' className='text-gray-500'>
								-- Pilih Kategori Pura --
							</option>
							{listKategori.map((data) => (
								<option key={data.id} value={data.value}>
									{data.kategori}
								</option>
							))}
						</select>
						{errors?.kategori && (
							<p className='px-1 text-xs text-red-600'>
								{errors.kategori.message}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='konten'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Sejarah<span className='text-red-500'>*</span>
				</label>
				<EditorCreatePura updateParentData={receiveContent} />
			</div>
			<div className='flex justify-end gap-4'>
				<Button
					disabled={isLoading}
					variant='subtle'
					onClick={() => router.back()}
				>
					Batalkan
				</Button>
				<Button isLoading={isLoading}>Buat Pura</Button>
			</div>
		</form>
	);
}
