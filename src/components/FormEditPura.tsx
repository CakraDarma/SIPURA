'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { uploadFiles } from '@/lib/uploadthing';
import EditorJS from '@editorjs/editorjs';
import { kategoriPura } from '@/config/form';
import { SingleFileDropzone } from './SingleFileDropzone';
import { urlToBlobFile } from '@/lib/utils';

type FormData = z.infer<typeof PuraValidator>;

interface FormEditPuraProps {
	pura: any;
}
export default function FormEditPura({ pura }: FormEditPuraProps) {
	const [file, setFile] = useState<File>();
	const listKategori = kategoriPura;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(pura.thumbnail, pura.thumbnail);
				setFile(fetchedFile);
				setValue('thumbnail', fetchedFile);
			} catch (error) {
				// Tangani kesalahan jika terjadi
				console.error('Terjadi kesalahan:', error);
			}
		};

		fetchData();
	}, []);

	const router = useRouter();
	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(PuraValidator),
		defaultValues: {
			name: pura.name,
			tahunBerdiri: pura.tahunBerdiri,
			alamat: pura.alamat,
			piodalan: pura.piodalan,
			kategori: pura.kategori,
			konten: pura.konten,
			// thumbnail: file,
		},
	});

	const { mutate: createPura, isLoading } = useMutation({
		mutationFn: async ({
			alamat,
			kategori,
			name,
			piodalan,
			tahunBerdiri,
			konten,
			thumbnail,
		}: FormData) => {
			const [res] = await uploadFiles([thumbnail], 'imageUploader');
			const payload = {
				alamat,
				kategori,
				name,
				piodalan,
				tahunBerdiri,
				konten,
				thumbnail: res.fileUrl,
			};
			const { data } = await axios.patch(`/api/pura/${pura.id}`, payload);
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
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting Pura',
			});
			router.push(`/dashboard`);
		},
	});

	// editor
	const ref = useRef<EditorJS>();
	const _titleRef = useRef<HTMLTextAreaElement>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		const Header = (await import('@editorjs/header')).default;
		const Embed = (await import('@editorjs/embed')).default;
		const Table = (await import('@editorjs/table')).default;
		const List = (await import('@editorjs/list')).default;
		const LinkTool = (await import('@editorjs/link')).default;
		const ImageTool = (await import('@editorjs/image')).default;

		const body = PuraValidator.parse(pura);

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Ketik di sini untuk menulis...',
				inlineToolbar: true,
				data: body.konten,
				tools: {
					header: Header,
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link',
						},
					},
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									// upload to uploadthing
									const [res] = await uploadFiles([file], 'imageUploader');

									return {
										success: 1,
										file: {
											url: res.fileUrl,
										},
									};
								},
							},
						},
					},
					list: List,
					table: Table,
					embed: Embed,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (Object.keys(errors).length) {
			for (const [_key, value] of Object.entries(errors)) {
				value;
				toast({
					title: 'Terjadi kesalahan.',
					description: (value as { message: string }).message,
					variant: 'destructive',
				});
			}
		}
	}, [errors]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true);
		}
	}, []);

	useEffect(() => {
		const init = async () => {
			await initializeEditor();

			setTimeout(() => {
				_titleRef?.current?.focus();
			}, 0);
		};

		if (isMounted) {
			init();

			return () => {
				ref.current?.destroy();
				ref.current = undefined;
			};
		}
	}, [isMounted, initializeEditor]);

	if (!isMounted) {
		return null;
	}

	// submit file
	async function onSubmit(data: FormData) {
		const blocks = await ref.current?.save();

		const payload: FormData = {
			konten: blocks,
			alamat: data.alamat,
			kategori: data.kategori,
			name: data.name,
			piodalan: data.piodalan,
			tahunBerdiri: data.tahunBerdiri,
			thumbnail: data.thumbnail,
		};
		console.log(payload);
		createPura(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
							{...register('kategori')}
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
				{/* editor */}
				<label
					htmlFor='konten'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Deskripsi Pura<span className='text-red-500'>*</span>
				</label>
				<div className='mx-auto w-[800px] prose prose-stone dark:prose-invert border shadow-sm'>
					<div id='editor' className='min-h-[500px] ' />
					<p className='text-sm text-gray-500'>
						Gunakan{' '}
						<kbd className='px-1 text-xs uppercase border rounded-md bg-muted'>
							Tab
						</kbd>{' '}
						untuk membuka menu perintah
					</p>
				</div>
			</div>
			<div className='mb-5'>
				<label
					htmlFor='thumbnail'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Thumbnail<span className='text-red-500'>*</span>
				</label>
				<div className='flex flex-col items-center justify-center w-full '>
					<div className='w-fit'>
						<SingleFileDropzone
							width={200}
							height={200}
							value={getValues('thumbnail')}
							dropzoneOptions={{
								maxSize: 1024 * 1024 * 1, // 1MB
							}}
							onChange={(file) => {
								setFile(file);
								setValue('thumbnail', file);
								console.log(getValues('thumbnail'));
							}}
						/>
					</div>
				</div>
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
