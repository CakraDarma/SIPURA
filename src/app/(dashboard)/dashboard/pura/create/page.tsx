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
import DashboardHeader from '@/components/header';
import DashboardShell from '@/components/shell';

const Page = () => {
	const router = useRouter();
	const [input, setInput] = useState<string>('');
	const { loginToast } = useCustomToasts();

	const { mutate: createCommunity, isLoading } = useMutation({
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
						title: 'Pura already exists.',
						description: 'Please choose a different name.',
						variant: 'destructive',
					});
				}

				if (err.response?.status === 422) {
					return toast({
						title: 'Invalid pura name.',
						description: 'Please choose a name between 3 and 21 letters.',
						variant: 'destructive',
					});
				}

				if (err.response?.status === 401) {
					return loginToast();
				}
			}

			toast({
				title: 'There was an error.',
				description: 'Could not create pura.',
				variant: 'destructive',
			});
		},
		onSuccess: (data) => {
			router.push(`/dashboard/kegiatan/${data}`);
		},
	});

	return (
		// <DashboardShell>
		// 	<DashboardHeader
		// 		heading='Dashboard'
		// 		text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang
		// 				nyaman.'
		// 	/>
		// 	<div>
		// 		{/* {kegiatans?.length ? (
		// 			<div className='divide-y divide-border rounded-md border'>
		// 				{kegiatans.map((kegiatan) => (
		// 					<PostItem key={kegiatan.id} kegiatan={kegiatan} />
		// 				))}
		// 			</div>
		// 		) : (
		// 			<EmptyPlaceholder>
		// 				<EmptyPlaceholder.Icon name='kegiatan' />
		// 				<EmptyPlaceholder.Title>No kegiatans created</EmptyPlaceholder.Title>
		// 				<EmptyPlaceholder.Description>
		// 					You don&apos;t have any kegiatans yet. Start creating content.
		// 				</EmptyPlaceholder.Description>
		// 				<PostCreateButton variant='outline' />
		// 			</EmptyPlaceholder>
		// 		)} */}
		// 	</div>
		// </DashboardShell>

		<div className='container flex items-center h-full max-w-3xl mx-auto'>
			<div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-xl font-semibold'>Buat Kegiatan Pura</h1>
				</div>

				<hr className='bg-red-500 h-px' />

				<div>
					<p className='text-lg font-medium'>Nama</p>
					<p className='text-xs pb-2'>Nama Pura diawali dengan huruf kapital</p>
					<div className='relative'>
						<p className='absolute text-sm left-0 w-20 inset-y-0 grid place-items-center text-zinc-400'>
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
						onClick={() => createCommunity()}
					>
						Buat Pura
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
