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

interface ConfirmPuraOperationsProps {
	pura: Pick<Pura, 'id'>;
}

export default function ConfirmPuraOperations({
	pura,
}: ConfirmPuraOperationsProps) {
	const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
	const router = useRouter();

	const { mutate: deletePura, isPending } = useMutation({
		// puraId dari props
		mutationFn: async (puraId: string) => {
			const { data } = await axios.delete(`/api/pura/${puraId}`);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Pura tidak berhasil dihapus. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Pura berhasil dihapus.',
			});
			router.refresh();
			setShowDeleteAlert(false);
		},
	});

	const { mutate: acceptPura, isPending: isAcceptPuraPending } = useMutation({
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
				description: 'Status pura tidak berhasil dirubah. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Status pura berhasil dirubah.',
			});
			// window.location.reload();
			router.refresh();
			setShowDeleteAlert(false);
		},
	});

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center justify-center w-8 h-8 transition-colors border rounded-md hover:bg-muted'>
					<Icons.ellipsis className='w-4 h-4' />
					<span className='sr-only'>Open</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={async (event) => {
							event.preventDefault();
							acceptPura({ actived: true, puraId: pura.id });
						}}
					>
						Terima
						{isAcceptPuraPending && (
							<Icons.spinner className='w-4 h-4 ml-2 animate-spin' />
						)}
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href={`/dashboard/pura/${pura.id}/edit`}
							className='flex w-full'
						>
							Lihat & Sunting
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
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
							Apakah Anda yakin ingin menghapus pengajuan pura ini?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini akan dikirim ke pengaju pura.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
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
								<Icons.close className='w-4 h-4 mr-2' />
							)}
							<span>Hapus</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
