'use client';

import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { PelinggihValidator } from '@/lib/validators/inventaris';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/ui/Button';
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';

type FormData = z.infer<typeof PelinggihValidator>;

export default function FormCreatePelinggih() {
	const [file, setFile] = useState<File>();

	const router = useRouter();
	const params = useParams();
	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(PelinggihValidator),
		defaultValues: {
			puraId: params.puraId,
		},
	});

	const { mutate: createPelinggih, isPending } = useMutation({
		mutationFn: async ({
			nama,
			tahunPeninggalan,
			konten,
			thumbnail,
			puraId,
		}: FormData) => {
			const [res] = await uploadFiles([thumbnail], 'imageUploader');
			const payload = {
				nama,
				tahunPeninggalan,
				konten,
				thumbnail: res.fileUrl,
				puraId,
			};
			const { data } = await axios.post('/api/pura/pelinggih', payload);
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
				description: 'Tidak dapat membuat Pelinggih.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menambahkan Pelinggih',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/pelinggih`);
		},
	});
	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			nama: data.nama,
			tahunPeninggalan: data.tahunPeninggalan,
			konten: data.konten,
			thumbnail: data.thumbnail,
			puraId: params.puraId,
		};
		createPelinggih(payload);
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
							Nama Pelinggih<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('nama')}
							type='text'
							name='nama'
							id='nama'
							placeholder='Masukan tahun pelinggih dibangun'
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
							Tahun Pembangunan<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('tahunPeninggalan', {
								valueAsNumber: true,
							})}
							type='number'
							name='tahunPeninggalan'
							id='tahunPeninggalan'
							placeholder='Masukan tahun pelinggih dibangun'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.tahunPeninggalan && (
							<p className='px-1 text-xs text-red-600'>
								{errors.tahunPeninggalan.message}
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
					Deskripsi Pelinggih<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('konten')}
					id='konten'
					placeholder='Tambahkan deskripsi dari Pelinggih'
					required
					className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md h-40'
				></textarea>
				{errors?.konten && typeof errors.konten.message === 'string' && (
					<p className='px-1 text-xs text-red-600'>{errors.konten.message}</p>
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
							maxSize: 1024 * 1024 * 1, // 1MB
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
				>
					Batalkan
				</Button>
				<Button isLoading={isPending}>Buat Pelinggih</Button>
			</div>
		</form>
	);
}
