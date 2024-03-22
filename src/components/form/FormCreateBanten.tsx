'use client';

import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { BantenValidator } from '@/lib/validators/banten';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/ui/Button';
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { kategoriBanten } from '@/constants/kategoriBanten';

type FormData = z.infer<typeof BantenValidator>;

export default function FormCreateBanten() {
	const [file, setFile] = useState<File>();
	const listKategori = kategoriBanten;

	const router = useRouter();
	const params = useParams();
	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(BantenValidator),
		defaultValues: {
			puraId: params.puraId,
		},
	});

	const { mutate: createBanten, isPending } = useMutation({
		mutationFn: async ({
			nama,
			thumbnail,
			kategori,
			deskripsi,
			komponen,
			puraId,
		}: FormData) => {
			const [res] = await uploadFiles([thumbnail], 'imageUploader');
			const payload = {
				nama,
				thumbnail: res.fileUrl,
				kategori,
				deskripsi,
				komponen,
				puraId,
			};
			const { data } = await axios.post('/api/pura/banten', payload);
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
				description: 'Tidak dapat membuat banten.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menambahkan banten',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/banten`);
		},
	});
	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			nama: data.nama,
			kategori: data.kategori,
			deskripsi: data.deskripsi,
			komponen: data.komponen,
			thumbnail: data.thumbnail,
			puraId: params.puraId,
		};
		createBanten(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='nama'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Nama banten<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('nama')}
							type='text'
							name='nama'
							id='nama'
							placeholder='Masukkan nama dari banten'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.nama && (
							<p className='px-1 text-xs text-red-600'>{errors.nama.message}</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='tahunPeninggalan'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Kategori banten<span className='text-red-500'>*</span>
						</label>
						<select
							id='kategori'
							{...register('kategori')}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						>
							<option value='' className='text-gray-500'>
								-- Pilih kategori banten --
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
					htmlFor='deskripsi'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Deskripsi banten<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('deskripsi')}
					id='deskripsi'
					placeholder='Tambahkan deskripsi dari banten'
					required
					className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md h-40'
				></textarea>
				{errors?.deskripsi && typeof errors.deskripsi.message === 'string' && (
					<p className='px-1 text-xs text-red-600'>
						{errors.deskripsi.message}
					</p>
				)}
			</div>
			<div className='mb-5'>
				<label
					htmlFor='komponen'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Komponen banten<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('komponen')}
					id='komponen'
					placeholder='Tambahkan komponen dari banten'
					required
					className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md h-40'
				></textarea>
				{errors?.komponen && typeof errors.komponen.message === 'string' && (
					<p className='px-1 text-xs text-red-600'>{errors.komponen.message}</p>
				)}
			</div>
			<div className='mb-5'>
				<label
					htmlFor='thumbnail'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Thumbnail<span className='text-red-500'>*</span>
				</label>
				<div className='flex flex-row items-center justify-center w-full '>
					<SingleFileDropzone
						width={200}
						height={200}
						value={file}
						dropzoneOptions={{
							maxSize: 1024 * 1024 * 4, // 4MB
						}}
						onChange={(file) => {
							setFile(file);
							setValue('thumbnail', file);
						}}
					/>
				</div>
			</div>
			<div className='flex justify-end gap-4'>
				<Button
					disabled={isPending}
					variant='subtle'
					onClick={() => router.back()}
					type='button'
				>
					Batalkan
				</Button>
				<Button isLoading={isPending}>Tambahkan Banten</Button>
			</div>
		</form>
	);
}
