'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import { cn, urlToBlobFile } from '@/lib/utils';
import { UserValidator } from '@/lib/validators/user';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SingleFileDropzone } from '../SingleFileDropzone';
import { uploadFiles } from '@/lib/uploadthing';
import { useEffect, useState } from 'react';

interface FormEditUserProps extends React.HTMLAttributes<HTMLFormElement> {
	user: Pick<User, 'id' | 'name' | 'alamat' | 'telepon' | 'image'>;
}

type FormData = z.infer<typeof UserValidator>;

export function FormEditUser({ user, className, ...props }: FormEditUserProps) {
	const [file, setFile] = useState<File>();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(UserValidator),
		defaultValues: {
			name: user?.name || '',
			alamat: user.alamat || '',
			telepon: user.telepon || '',
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(user.image, user.image);
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

	const { mutate: updateUsername, isPending } = useMutation({
		mutationFn: async ({ name, telepon, alamat, thumbnail }: FormData) => {
			if (thumbnail.name == user.image) {
				const payload: FormData = {
					name,
					telepon,
					alamat,
					thumbnail: user.image,
				};
				const { data } = await axios.patch(`/api/user/${user.id}`, payload);
				return data;
			} else {
				const [res] = await uploadFiles([thumbnail], 'imageUploader');
				const payload: FormData = {
					name,
					telepon,
					alamat,
					thumbnail: res.fileUrl,
				};
				const { data } = await axios.patch(`/api/user/`, payload);
				return data;
			}
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					return toast({
						title: 'Username sudah digunakan.',
						description: 'Silakan pilih username lain.',
						variant: 'destructive',
					});
				}
			}

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
		},
	});

	return (
		<form
			className={cn(className)}
			onSubmit={handleSubmit((e) => updateUsername(e))}
			{...props}
		>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='name'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Username<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('name')}
							type='text'
							name='name'
							id='name'
							placeholder='Masukkan Username'
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
							htmlFor='telepon'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Nomor Telepon<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('telepon')}
							type='number'
							name='telepon'
							id='telepon'
							placeholder='Masukkan nomor telepon'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.telepon && (
							<p className='px-1 text-xs text-red-600'>
								{errors.telepon.message}
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
					Alamat Rumah<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('alamat')}
					id='alamat'
					placeholder='Masukkan alamat rumah'
					required
					className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md h-40'
				></textarea>
				{errors?.alamat && (
					<p className='px-1 text-xs text-red-600'>{errors.alamat.message}</p>
				)}
			</div>
			<div className='mb-5'>
				<label
					htmlFor='thumbnail'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Foto Profil<span className='text-red-500'>*</span>
				</label>
				<div className='flex flex-row items-center justify-center w-full '>
					<SingleFileDropzone
						width={200}
						height={200}
						value={getValues('thumbnail')}
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
