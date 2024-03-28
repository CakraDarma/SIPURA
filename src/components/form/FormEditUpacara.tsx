'use client';

import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { UpacaraValidator } from '@/lib/validators/upacara';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { uploadFiles } from '@/lib/uploadthing';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { urlToBlobFile } from '@/lib/utils';
import { Banten, Upacara } from '@prisma/client';
import { Icons } from '../Icons';

type FormData = z.infer<typeof UpacaraValidator>;
interface BantenOption {
	value: string;
	label: string;
}

interface FormEditUpacaraProps {
	upacara: Pick<
		Upacara,
		'id' | 'deskripsi' | 'nama' | 'puraId' | 'biaya' | 'thumbnail' | 'bantens'
	>;
	dataBanten: Banten[];
}
export default function FormEditUpacara({
	upacara,
	dataBanten,
}: FormEditUpacaraProps) {
	const [file, setFile] = useState<File>();
	const router = useRouter();
	const params = useParams();

	const bantenOptions: BantenOption[] = dataBanten.map((bantenItem) => ({
		value: bantenItem.id,
		label: `Banten ${bantenItem.nama || 'Unknown'}`,
	}));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(
					upacara.thumbnail,
					upacara.thumbnail
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
		control,
		register,
		formState: { errors },
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(UpacaraValidator),
		defaultValues: {
			nama: upacara.nama,
			biaya: upacara.biaya || undefined,
			deskripsi: upacara.deskripsi,
			puraId: upacara.puraId,
			// @ts-ignore
			bantens: upacara.bantens,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'bantens',
	});

	const { mutate: editUpacara, isPending } = useMutation({
		mutationFn: async ({
			nama,
			biaya,
			deskripsi,
			thumbnail,
			puraId,
			bantens,
		}: FormData) => {
			if (thumbnail.name == upacara.thumbnail) {
				const payload = {
					nama,
					biaya,
					deskripsi,
					puraId,
					thumbnail: upacara.thumbnail,
					bantens,
				};

				const { data } = await axios.patch(
					`/api/pura/upacara/${upacara.id}`,
					payload
				);
				return data as string;
			} else {
				const [res] = await uploadFiles([thumbnail], 'imageUploader');
				const payload = {
					nama,
					biaya,
					deskripsi,
					puraId,
					thumbnail: res.fileUrl,
				};
				const { data } = await axios.patch(
					`/api/pura/upacara/${upacara.id}`,
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
				description: 'Tidak dapat menyunting upacara.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting upacara',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/upacara`);
		},
	});

	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			nama: data.nama,
			biaya: data.biaya,
			deskripsi: data.deskripsi,
			thumbnail: data.thumbnail,
			puraId: upacara.puraId,
			// @ts-ignore
			bantens: data.bantens,
		};
		editUpacara(payload);
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
							Nama Upacara<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('nama')}
							type='text'
							name='nama'
							id='nama'
							placeholder='Masukkan nama dari upacara'
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
							htmlFor='biaya'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Biaya<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('biaya', {
								valueAsNumber: true,
							})}
							type='number'
							name='biaya'
							id='biaya'
							placeholder='Masukkan tahun upacara ditemukan'
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						/>
						{errors?.biaya && (
							<p className='px-1 text-xs text-red-600'>
								{errors.biaya.message}
							</p>
						)}
					</div>
				</div>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='banten'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Banten<span className='text-red-500'>*</span>
				</label>
				{fields.map((field, index) => (
					<div className='flex flex-row gap-3 py-3' key={field.id}>
						<select
							id='banten'
							// @ts-ignore
							{...register(`bantens[${index}].idBanten`)}
							// @ts-ignore
							onChange={(e) =>
								// @ts-ignore
								setValue(`bantens[${index}].idBanten`, e.target.value)
							}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
						>
							<option value='' className='text-[#6B7280]'>
								-- Pilih banten Pura --
							</option>
							{bantenOptions.map((data) => (
								<option key={data.value} value={data.value}>
									{data.label}
								</option>
							))}
						</select>

						<button
							onClick={() => remove(index)}
							className='px-2 py-1 text-white bg-gray-200'
						>
							<Icons.hapus color='black' className='w-8 h-8 sm:h-6 sm:w-6' />
						</button>
					</div>
				))}
				{errors?.bantens && (
					<p className='px-1 text-xs text-red-600'>Banten tidak boleh kosong</p>
				)}
				<div className='flex flex-col items-start justify-center w-full gap-2 '>
					<button
						className='px-4 py-2 text-blue-400 bg-white'
						onClick={() => append({ idBanten: '' })}
					>
						+ Tambahkan Banten
					</button>
				</div>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='deskripsi'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Deskripsi Upacara<span className='text-red-500'>*</span>
				</label>
				<textarea
					{...register('deskripsi')}
					id='deskripsi'
					placeholder='Tambahkan deskripsi dari Upacara'
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
