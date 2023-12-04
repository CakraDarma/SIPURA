'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { CreateSubredditPayload } from '@/lib/validators/pura';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';

const Page = () => {
	const router = useRouter();
	const [input, setInput] = useState<string>('');
	const { loginToast } = useCustomToasts();

	const { mutate: createPura, isLoading } = useMutation({
		mutationFn: async () => {
			const payload: CreateSubredditPayload = {
				name: input,
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
						title: 'Nama pura tidak valid.',
						description: 'Silakan pilih nama antara 3 dan 21 huruf.',
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
		onSuccess: (data) => {
			router.push(`/dashboard/${data}`);
		},
	});

	return (
		<div className='container flex flex-col h-full space-y-6 max-w-7xl'>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<div>
				<p className='text-lg font-medium'>Nama</p>
				<p className='pb-2 text-xs'>Nama Pura diawali dengan huruf kapital</p>
				<div className='relative'>
					<p className='absolute inset-y-0 left-0 grid w-20 text-sm place-items-center text-zinc-400'>
						Pura/
					</p>
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='pl-16'
					/>
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
				<Button
					isLoading={isLoading}
					disabled={input.length === 0}
					onClick={() => createPura()}
				>
					Buat Pura
				</Button>
			</div>
		</div>
	);
};

export default Page;
