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
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { urlToBlobFile } from '@/lib/utils';
import { VirtualTour } from '@prisma/client';

type FormData = z.infer<typeof VirtualTourValidator>;

interface FormEditVirtualTourProps {
	virtualTour: Pick<VirtualTour, 'id' | 'virtualTour' | 'puraId'>;
}
export default function FormEditVirtualTour({
	virtualTour,
}: FormEditVirtualTourProps) {
	const [file, setFile] = useState<File>();
	const router = useRouter();
	const params = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(
					virtualTour.virtualTour,
					virtualTour.virtualTour
				);
				setFile(fetchedFile);
				setValue('virtualTour', fetchedFile);
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
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(VirtualTourValidator),
		defaultValues: {
			puraId: virtualTour.puraId,
		},
	});

	const { mutate: editVirtualTour, isPending } = useMutation({
		mutationFn: async ({ virtualTour, puraId }: FormData) => {
			const [res] = await uploadFiles([virtualTour], 'imageUploader');
			const payload = {
				puraId,
				virtualTour: res.fileUrl,
			};
			const { data } = await axios.patch(
				`/api/pura/virtual-tour/${params.virtualTourId}`,
				payload
			);
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
				description: 'Tidak dapat menyunting virtualTour.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting VirtualTour',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/virtual-tour`);
		},
	});

	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			virtualTour: data.virtualTour,
			puraId: virtualTour.puraId,
		};

		editVirtualTour(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-5'>
				<label
					htmlFor='virtualTour'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Virtual Tour<span className='text-red-500'>*</span>
				</label>
				<div className='flex flex-row items-center justify-center w-full '>
					<SingleFileDropzone
						width={200}
						height={200}
						value={getValues('virtualTour')}
						dropzoneOptions={{
							maxSize: 1024 * 1024 * 1, // 1MB
						}}
						onChange={(file) => {
							setFile(file);
							setValue('virtualTour', file);
						}}
					/>
				</div>
				{errors?.virtualTour &&
					typeof errors.virtualTour.message === 'string' && (
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
				<Button isLoading={isPending}>Buat Virtual Tour</Button>
			</div>
		</form>
	);
}
