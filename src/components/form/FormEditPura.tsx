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
import { SingleFileDropzone } from '@/components/SingleFileDropzone';
import { urlToBlobFile } from '@/lib/utils';
import { Desa, Pura } from '@prisma/client';
import { wuku } from '@/constants/wuku';
import { SaptaWara } from '@/constants/saptaWara';
import { pancaWara } from '@/constants/pancaWara';
import { kategoriPura } from '@/constants/kategoriPura';
type FormData = z.infer<typeof PuraValidator>;

import '@/styles/editor.css';
interface FormEditPuraProps {
	pura: Pura;
	data: Kecamatan[];
}
interface DesaOption {
	value: string;
	label: string;
}

interface Kecamatan {
	id: string;
	kecamatan: string;
	desas: Desa[];
}

export default function FormEditPura({ pura, data }: FormEditPuraProps) {
	const [file, setFile] = useState<File>();
	const listKategori = kategoriPura;
	const listWuku = wuku;
	const listPancaWara = pancaWara;
	const listSaptaWara = SaptaWara;

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

	const findLabelByValue = (
		value: string
	): { value: string; label: string } | null => {
		const selectedDesaOption = desaOptions.find(
			(option) => option.value === value
		);
		return (
			selectedDesaOption || {
				value,
				label: `Desa ${value}, Kecamatan ${value}`,
			}
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedFile = await urlToBlobFile(pura.thumbnail, pura.thumbnail);
				const labelDesa = findLabelByValue(pura.desaId);
				setSelectedDesa(labelDesa);
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
			wuku: pura.wuku,
			pancaWara: pura.pancaWara,
			saptaWara: pura.saptaWara,
			kategori: pura.kategori,
			konten: pura.konten,
			desaId: pura.desaId,
			// thumbnail: file,
		},
	});

	const { mutate: editPura, isPending } = useMutation({
		mutationFn: async ({
			alamat,
			kategori,
			name,
			wuku,
			pancaWara,
			saptaWara,
			tahunBerdiri,
			konten,
			thumbnail,
			desaId,
		}: FormData) => {
			if (thumbnail.name == pura.thumbnail) {
				const payload = {
					alamat,
					kategori,
					name,
					wuku,
					pancaWara,
					saptaWara,
					tahunBerdiri,
					konten,
					desaId,
					thumbnail: pura.thumbnail,
				};
				const { data } = await axios.patch(`/api/pura/${pura.id}`, payload);
				return data as string;
			} else {
				const [res] = await uploadFiles([thumbnail], 'imageUploader');
				const payload = {
					alamat,
					kategori,
					name,
					wuku,
					pancaWara,
					saptaWara,
					tahunBerdiri,
					konten,
					desaId,
					thumbnail: res.fileUrl,
				};
				const { data } = await axios.patch(`/api/pura/${pura.id}`, payload);
				return data as string;
			}
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
				description: 'Tidak dapat menyunting pura.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menyunting pura',
			});
			router.push(`/dashboard/${pura.id}`);
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
			wuku: data.wuku,
			saptaWara: data.saptaWara,
			pancaWara: data.pancaWara,
			tahunBerdiri: data.tahunBerdiri,
			thumbnail: data.thumbnail,
			desaId: data.desaId,
		};
		editPura(payload);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 mb-5 sm:w-1/2'>
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
						placeholder='Masukkan nama pura'
						className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
					/>
					{errors?.name && (
						<p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
					)}
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
							placeholder='Masukkan tahun berdiri pura'
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
					placeholder='Masukkan alamat pura'
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
					placeholder='Pilih Desa...'
					className='z-10'
				/>
				{errors?.alamat && (
					<p className='px-1 text-xs text-red-600'>{errors.alamat.message}</p>
				)}
			</div>

			{/* desa & kategori */}
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
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
							<p className='px-1 text-xs text-red-600'>
								{errors.alamat.message}
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
								-- Pilih kategori pura --
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

			{/* piodalan */}
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/3'>
					<div className='mb-5'>
						<label
							htmlFor='wuku'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Wuku<span className='text-red-500'>*</span>
						</label>
						<select
							id='wuku'
							// @ts-ignore
							onChange={(e) => setValue('wuku', e.target.value)}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
							{...register('wuku')}
						>
							<option value='' className='text-[#6B7280]'>
								-- Pilih Wuku Piodalan --
							</option>
							{listWuku.map((data) => (
								<option key={data.id} value={data.value}>
									{data.wuku}
								</option>
							))}
						</select>
						{errors?.wuku && (
							<p className='px-1 text-xs text-red-600'>{errors.wuku.message}</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/3'>
					<div className='mb-5'>
						<label
							htmlFor='kategori'
							className='mb-3 block text-base font-medium texpiodalant-[#07074D]'
						>
							Panca Wara<span className='text-red-500'>*</span>
						</label>
						<select
							id='pancaWara'
							// @ts-ignore
							onChange={(e) => setValue('pancaWara', e.target.value)}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
							{...register('pancaWara')}
						>
							<option value='' className='text-[#6B7280]'>
								-- Pilih Panca Wara Piodalan --
							</option>
							{listPancaWara.map((data) => (
								<option key={data.id} value={data.value}>
									{data.pancaWara}
								</option>
							))}
						</select>
						{errors?.pancaWara && (
							<p className='px-1 text-xs text-red-600'>
								{errors.pancaWara.message}
							</p>
						)}
					</div>
				</div>
				<div className='w-full px-3 sm:w-1/3'>
					<div className='mb-5'>
						<label
							htmlFor='saptaWara'
							className='mb-3 block text-base font-medium texpiodalant-[#07074D]'
						>
							Sapta Wara<span className='text-red-500'>*</span>
						</label>
						<select
							id='saptaWara'
							// @ts-ignore
							onChange={(e) => setValue('saptaWara', e.target.value)}
							className='w-full rounded-md border border-gray-500 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md'
							{...register('saptaWara')}
						>
							<option value='' className='text-[#6B7280]'>
								-- Pilih Sapta Wara Piodalan --
							</option>
							{listSaptaWara.map((data) => (
								<option key={data.id} value={data.value}>
									{data.saptaWara}
								</option>
							))}
						</select>
						{errors?.saptaWara && (
							<p className='px-1 text-xs text-red-600'>
								{errors.saptaWara.message}
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
				<div className='w-full mx-auto border shadow-sm '>
					<div id='editor' className='min-h-[500px] w-full' />
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
								maxSize: 1024 * 1024 * 4, // 4MB
							}}
							onChange={(file) => {
								setFile(file);
								setValue('thumbnail', file);
							}}
						/>
					</div>
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
