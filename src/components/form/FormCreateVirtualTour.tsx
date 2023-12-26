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
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';

type FormData = z.infer<typeof VirtualTourValidator>;

export default function FormCreateVirtualTour() {
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
		resolver: zodResolver(VirtualTourValidator),
		defaultValues: {
			puraId: params.puraId,
		},
	});

	const { mutate: createVirtualTour, isPending } = useMutation({
		mutationFn: async ({ virtualTour, puraId }: FormData) => {
			const [res] = await uploadFiles([virtualTour], 'imageUploader');
			const payload = {
				virtualTour: res.fileUrl,
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
				description: 'Tidak dapat membuat VirtualTour.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menambahkan VirtualTour',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/virtualTour`);
		},
	});
	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			virtualTour: data.virtualTour,
			puraId: params.puraId,
		};
		createVirtualTour(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-5'>
				<label
					htmlFor='virtualTour'
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
							setValue('virtualTour', file);
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
				<Button isLoading={isPending}>Buat VirtualTour</Button>
			</div>
		</form>
	);
}
