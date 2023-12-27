'use client';

import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { UserRolesValidator } from '@/lib/validators/prajuru';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { urlToBlobFile } from '@/lib/utils';
import { User } from '@prisma/client';
import Select from 'react-select';
type FormData = z.infer<typeof UserRolesValidator>;

interface FormAddRolesProps {
	prajuru: User[];
	puraId: string;
}

export default function FormAddRoles({ prajuru, puraId }: FormAddRolesProps) {
	const [selectedPrajuru, setselectedPrajuru] = useState<any>();
	const router = useRouter();
	const params = useParams();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const fetchedFile = await urlToBlobFile(
	// 				prajuru.,
	// 				prajuru.thumbnail
	// 			);
	// 			setFile(fetchedFile);
	// 			setValue('thumbnail', fetchedFile);
	// 		} catch (error) {
	// 			return toast({
	// 				title: 'Gagal menampilkan data.',
	// 				description: 'Silakan coba beberapa saat kembali.',
	// 				variant: 'destructive',
	// 			});
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	const { loginToast } = useCustomToasts();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(UserRolesValidator),
		defaultValues: {},
	});

	const { mutate: addUserRoles, isPending } = useMutation({
		mutationFn: async ({ userId }: FormData) => {
			const payload = {
				userId,
				puraId: params.puraId,
			};
			const { data } = await axios.post(
				`/api/pura/${puraId}/userRoles`,
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
				description: 'Tidak dapat menambahkan hak akses prajuru.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Berhasil menambahkan hak akses prajuru',
			});
			router.refresh();
			router.push(`/dashboard/${params.puraId}/prajuru`);
		},
	});

	// submit file
	async function onSubmit(data: FormData) {
		const payload: FormData = {
			userId: data.userId,
		};
		addUserRoles(payload);
	}

	const prajuruOptions = prajuru.map((p) => ({
		value: p.id,
		label: p.name,
	}));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 sm:w-1/2'>
					<div className='mb-5'>
						<label
							htmlFor='userId'
							className='mb-3 block text-base font-medium text-[#07074D]'
						>
							Prajuru<span className='text-red-500'>*</span>
						</label>
						<Select
							placeholder='Tambahkan User'
							value={selectedPrajuru}
							onChange={(selectedOption) => {
								setselectedPrajuru(selectedOption);
								setValue('userId', selectedOption.value);
							}}
							options={prajuruOptions}
						/>
						{errors?.userId && (
							<p className='px-1 text-xs text-red-600'>
								{errors.userId.message}
							</p>
						)}
					</div>
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
				<Button isLoading={isPending}>Tambahkan prajuru</Button>
			</div>
		</form>
	);
}
