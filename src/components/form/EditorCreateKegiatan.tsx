'use client';

import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { uploadFiles } from '@/lib/uploadthing';
import {
	KegiatanCreationRequest,
	kegiatanValidator,
} from '@/lib/validators/kegiatan';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import '@/styles/editor.css';

type FormData = z.infer<typeof kegiatanValidator>;

interface EditorProps {
	puraId: string;
}

export const EditorCreateKegiatan = ({ puraId }: EditorProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(kegiatanValidator),
		defaultValues: {
			puraId,
			title: '',
			content: null,
		},
	});

	const ref = useRef<EditorJS>();
	const _titleRef = useRef<HTMLTextAreaElement>(null);
	const router = useRouter();
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const pathname = usePathname();

	const { mutate: createKegiatan, isPending } = useMutation({
		mutationFn: async ({ title, content, puraId }: KegiatanCreationRequest) => {
			const payload: KegiatanCreationRequest = { title, content, puraId };
			const { data } = await axios.post('/api/pura/kegiatan', payload);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description:
					'Kegiatan Anda tidak berhasil dipublikasikan. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			const newPathname = pathname.split('/').slice(0, -1).join('/');
			router.push(newPathname);

			router.refresh();

			return toast({
				description: 'Kegiatan Anda berhasil dipublikasikan.',
			});
		},
	});

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
				placeholder: 'Ketik di sini untuk menulis postingan Anda...',
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

	async function onSubmit(data: FormData) {
		const blocks = await ref.current?.save();

		const payload: KegiatanCreationRequest = {
			title: data.title,
			content: blocks,
			puraId,
		};

		createKegiatan(payload);
	}

	if (!isMounted) {
		return null;
	}

	const { ref: titleRef, ...rest } = register('title');

	return (
		<>
			<div className='w-full py-4 border rounded-lg bg-zinc-50 border-white-dark'>
				<form
					id='pura-kegiatan-form'
					className='w-full '
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='flex flex-col items-center justify-center w-full mx-auto'>
						<TextareaAutosize
							ref={(e) => {
								titleRef(e);
								// @ts-ignore
								_titleRef.current = e;
							}}
							{...rest}
							placeholder='Judul'
							className='w-full overflow-hidden text-5xl font-bold bg-transparent resize-none sm:pl-16 focus:outline-none'
						/>
						<div id='editor' className='min-h-[500px] w-full ' />
						<p className='text-sm text-gray-500'>
							Gunakan{' '}
							<kbd className='px-1 text-xs uppercase border rounded-md bg-muted'>
								Tab
							</kbd>{' '}
							untuk membuka menu perintah
						</p>
					</div>
				</form>
			</div>
			<div className='flex justify-end w-full'>
				<Button
					type='submit'
					className='w-full'
					form='pura-kegiatan-form'
					isLoading={isPending}
				>
					Tambah
				</Button>
			</div>
		</>
	);
};
