'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pura } from '@prisma/client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { toast } from '@/hooks/use-toast';
import { Icons } from '@/components/Icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface PuraOperationsProps {
	pura: Pick<Pura, 'id' | 'name'>;
}

export default function PuraOperations({ pura }: PuraOperationsProps) {
	const router = useRouter();
	const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
	const [showUpdateAlert, setShowUpdateAlert] = React.useState<boolean>(false);

	const { mutate: deletePura, isPending: isPending } = useMutation({
		// puraId dari props
		mutationFn: async (puraId: string) => {
			const { data } = await axios.delete(`/api/pura/${puraId}`);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Pura Anda tidak berhasil dihapus. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Pura Anda berhasil dihapus.',
			});
			router.refresh();
			setShowDeleteAlert(false);
		},
	});

	const { mutate: unActivePura, isPending: isPendingUpdate } = useMutation({
		// puraId dari props
		mutationFn: async ({
			actived,
			puraId,
		}: {
			actived: boolean;
			puraId: string;
		}) => {
			const payload = {
				actived,
			};
			const { data } = await axios.patch(
				`/api/pura/actived/${puraId}`,
				payload
			);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description:
					'Pura Anda tidak berhasil dinonaktifkan. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Pura Anda berhasil dinonaktifkan.',
			});
			router.refresh();
			setShowDeleteAlert(false);
		},
	});

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center justify-center w-8 h-8 transition-colors rounded-md hover:bg-muted'>
					<Icons.ellipsis className='w-4 h-4' />
					<span className='sr-only'>Open</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem>
						<Link
							href={`/dashboard/pura/${pura.id}/edit`}
							className='flex w-full'
						>
							Sunting
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='flex w-full'
						onSelect={() => {
							setShowUpdateAlert(true);
							document.body.style.pointerEvents = '';
						}}
					>
						Non Aktif
					</DropdownMenuItem>
					<DropdownMenuItem
						className='flex items-center cursor-pointer text-destructive focus:text-destructive'
						onSelect={() => {
							setShowDeleteAlert(true);
							document.body.style.pointerEvents = '';
						}}
					>
						Hapus
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Apakah Anda yakin ingin menghapus Pura ini?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini tidak dapat dibatalkan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batalkan</AlertDialogCancel>
						<AlertDialogAction
							onClick={async (event) => {
								event.preventDefault();
								deletePura(pura.id);
							}}
							className='bg-red-600 focus:ring-red-600'
						>
							{isPending ? (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							) : (
								<Icons.trash className='w-4 h-4 mr-2' />
							)}
							<span>Hapus</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog open={showUpdateAlert} onOpenChange={setShowUpdateAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Apakah Anda yakin ingin menonaktifkan Pura ini?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini tidak dapat dibatalkan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batalkan</AlertDialogCancel>
						<AlertDialogAction
							onClick={async (event) => {
								event.preventDefault();
								unActivePura({ actived: false, puraId: pura.id });
							}}
							className='ring-red-600 focus:ring-red-600'
						>
							{isPendingUpdate ? (
								<Icons.spinner className='w-4 h-4 mr-2 animate-spin' />
							) : (
								<Icons.trash className='w-4 h-4 mr-2' />
							)}
							<span>Update</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
