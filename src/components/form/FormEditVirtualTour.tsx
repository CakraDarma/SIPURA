'use client';

import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { VirtualTourValidator } from '@/lib/validators/virtualTour';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { VirtualTour } from '@prisma/client';
import { urlToBlobFile } from '@/lib/utils';
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
type FormData = z.infer<typeof VirtualTourValidator>;

interface FormEditVirtualTourProps {
	virtualTour: Pick<
		VirtualTour,
		'id' | 'virtualTour' | 'puraId' | 'nama' | 'thumbnail'
	>;
}
export default function FormEditVirtualTour({
	virtualTour,
}: FormEditVirtualTourProps) {
	const [file, setFile] = useState<File>();
	const router = useRouter();
	const params = useParams();
	const [preview, setPreview] = useState(virtualTour.virtualTour);

	const { loginToast } = useCustomToasts();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(
					virtualTour.thumbnail,
					virtualTour.thumbnail
				);

				setFile(fetchedFile);
				setValue('thumbnail', fetchedFile);

				getValues('thumbnail');
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

	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(VirtualTourValidator),
		defaultValues: {
			puraId: virtualTour.puraId,
			virtualTour: virtualTour.virtualTour,
			nama: virtualTour.nama,
		},
	});

	const { mutate: editVirtualTour, isPending } = useMutation({
		mutationFn: async ({
			virtualTour: vt,
			puraId,
			nama,
			thumbnail,
		}: FormData) => {
			if (thumbnail.name == virtualTour.thumbnail) {
				const payload = {
					puraId,
					virtualTour: vt,
					nama,
					thumbnail: virtualTour.thumbnail,
				};
				const { data } = await axios.patch(
					`/api/pura/virtual-tour/${params.virtualTourId}`,
					payload
				);
				return data as string;
			} else {
				const [res] = await uploadFiles([thumbnail], 'imageUploader');
				const payload = {
					puraId,
					virtualTour: vt,
					nama,
					thumbnail: res.fileUrl,
				};
				const { data } = await axios.patch(
					`/api/pura/virtual-tour/${params.virtualTourId}`,
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
				description: 'Tidak dapat menyunting virtual tour.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting virtual tour',
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
			puraId: virtualTour.puraId,
			thumbnail: data.thumbnail,
		};

		editVirtualTour(payload);
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
						placeholder='Masukkan nama virtual tour'
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
						placeholder='Masukkan url virtual tour'
						min='0'
						className='w-full appearance-none rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
					/>
					{errors?.virtualTour && (
						<p className='px-1 text-xs text-red-600'>
							{errors.virtualTour.message}
						</p>
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
					<Button isLoading={isPending}>Sunting</Button>
				</div>
			</form>
		</div>
	);
}
