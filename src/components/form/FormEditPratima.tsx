'use client';

import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { PratimaValidator } from '@/lib/validators/inventaris';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { urlToBlobFile } from '@/lib/utils';
import { Pratima } from '@prisma/client';

type FormData = z.infer<typeof PratimaValidator>;

interface FormEditPratimaProps {
	pratima: Pick<
		Pratima,
		'id' | 'konten' | 'nama' | 'puraId' | 'tahunDitemukan' | 'thumbnail'
	>;
}
export default function FormEditPratima({ pratima }: FormEditPratimaProps) {
	const [file, setFile] = useState<File>();
	const router = useRouter();
	const params = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(
					pratima.thumbnail,
					pratima.thumbnail
				);
				setFile(fetchedFile);
				setValue('thumbnail', fetchedFile);
			} catch (error) {
				return toast({
					title: 'Gagal menampilkan data.',
					description: 'Silakan coba beberapa saat kembali.',
					variant: 'destructive',
				});
			}
		};

		fetchData();
	}, []);

	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(PratimaValidator),
		defaultValues: {
			nama: pratima.nama,
			tahunDitemukan: pratima.tahunDitemukan,
			konten: pratima.konten,
			puraId: pratima.puraId,
		},
	});

	const { mutate: editPratima, isPending } = useMutation({
		mutationFn: async ({
			nama,
			tahunDitemukan,
			konten,
			thumbnail,
			puraId,
		}: FormData) => {
			if (thumbnail.name == pratima.thumbnail) {
				const payload = {
					nama,
					tahunDitemukan,
					konten,
					puraId,
					thumbnail: pratima.thumbnail,
				};
				const { data } = await axios.patch(
					`/api/pura/pratima/${pratima.id}`,
					payload
				);
				return data as string;
			} else {
				const [res] = await uploadFiles([thumbnail], 'imageUploader');
				const payload = {
					nama,
					tahunDitemukan,
					konten,
					puraId,
					thumbnail: res.fileUrl,
				};
				const { data } = await axios.patch(
					`/api/pura/pratima/${pratima.id}`,
					payload
				);
				return data as string;
			}
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
				description: 'Tidak dapat menyunting pratima.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting pratima',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/pratima`);
		},
	});

	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			nama: data.nama,
			tahunDitemukan: data.tahunDitemukan,
			konten: data.konten,
			thumbnail: data.thumbnail,
			puraId: pratima.puraId,
		};
		editPratima(payload);
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
							Nama Pratima<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('nama')}
							type='text'
							name='nama'
							id='nama'
							placeholder='Masukkan nama dari pratima'
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
							htmlFor='tahunDitemukan'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Tahun Pembangunan<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('tahunDitemukan', {
								valueAsNumber: true,
							})}
							type='number'
							name='tahunDitemukan'
							id='tahunDitemukan'
							placeholder='Masukkan tahun pratima dibangun'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.tahunDitemukan && (
							<p className='px-1 text-xs text-red-600'>
								{errors.tahunDitemukan.message}
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
					Deskripsi Pratima<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('konten')}
					id='konten'
					placeholder='Tambahkan deskripsi dari Pratima'
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
				<Button isLoading={isPending}>Sunting</Button>
			</div>
		</form>
	);
}
