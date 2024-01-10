'use client';
import Select from 'react-select';
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
import { Button } from '@/components/ui/Button';
import { uploadFiles } from '@/lib/uploadthing';
import EditorJS from '@editorjs/editorjs';
import { kategoriPura } from '@/config/form';
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { Desa } from '@prisma/client';

type FormData = z.infer<typeof PuraValidator>;

interface DesaOption {
	value: string;
	label: string;
}

interface Kecamatan {
	id: string;
	kecamatan: string;
	desas: Desa[];
}
interface FormCreatePuraProps {
	data: Kecamatan[];
}

export default function FormCreatePura({ data }: FormCreatePuraProps) {
	const [file, setFile] = useState<File>();
	const listKategori = kategoriPura;

	const [selectedDesa, setSelectedDesa] = useState<DesaOption | null>(null);

	const desaOptions: DesaOption[] = data.reduce<DesaOption[]>(
		(options, kecamatan) => {
			const desaList = kecamatan.desas.map((desa) => ({
				value: desa.id,
				label: `Desa ${desa.desa || 'Unknown'}, Kecamatan ${
					kecamatan.kecamatan
				}`,
			}));
			return options.concat(desaList);
		},
		[]
	);

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

	const { mutate: createPura, isPending } = useMutation({
		mutationFn: async ({
			alamat,
			kategori,
			name,
			piodalan,
			tahunBerdiri,
			konten,
			thumbnail,
			desaId,
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
				desaId,
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
				description: 'Tidak dapat membuat Pura.',
				variant: 'destructive',
			});
		},
		onSuccess: (res) => {
			toast({
				description: 'Berhasil menambahkan Pura',
			});
			router.push(`/dashboard/${res}`);
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

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Ketik di sini untuk menulis...',
				inlineToolbar: true,
				data: { blocks: [] },
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
			desaId: data.desaId,
		};
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
							placeholder='Masukkan nama Pura'
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
							placeholder='Masukkan tahun berdiri Pura'
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
					placeholder='Masukkan alamat Pura'
					min='0'
					className='w-full appearance-none rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
				/>
				{errors?.alamat && (
					<p className='px-1 text-xs text-red-600'>{errors.alamat.message}</p>
				)}
			</div>
			<div className='mb-5'>
				<label
					htmlFor='alamat'
					className='mb-3 block text-base font-medium text-[#07074D]'
				>
					Desa<span className='text-red-500'>*</span>
				</label>
				<Select
					options={desaOptions}
					value={selectedDesa}
					onChange={(selectedOption) => {
						if (!selectedOption) return '';
						setSelectedDesa(selectedOption);
						setValue('desaId', selectedOption.value);
					}}
					placeholder='Pilih desa...'
					className='z-10'
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
							Piodalan<span className='text-red-500'>*</span>
						</label>
						<input
							{...register('piodalan')}
							type='text'
							name='piodalan'
							id='piodalan'
							placeholder='Masukkan piodalan Pura'
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
							<option value='' className='text-[#6B7280]'>
								-- Pilih kategori Pura --
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
				>
					Batalkan
				</Button>
				<Button isLoading={isPending}>Simpan</Button>
			</div>
		</form>
	);
}
