'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Kegiatan } from '@prisma/client';

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
import { Icons } from '@/components/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface KegiatanOperationsProps {
	kegiatan: Pick<Kegiatan, 'id' | 'title'>;
}

export default function KegiatanOperations({
	kegiatan,
}: KegiatanOperationsProps) {
	const router = useRouter();
	const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
	const params = useParams();

	const { mutate: deleteKegiatan, isLoading } = useMutation({
		mutationFn: async (kegiatanId: string) => {
			const { data } = await axios.delete(`/api/pura/kegiatan/${kegiatanId}`);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Kegiatan Anda tidak berhasil dihapus. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Kegiatan Anda berhasil dihapus.',
			});
			router.refresh();
			setShowDeleteAlert(false);
		},
	});

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted'>
					<Icons.ellipsis className='h-4 w-4' />
					<span className='sr-only'>Open</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem>
						<Link
							href={`dashboard/${params.puraId}/kegiatan/${kegiatan.id}/edit`}
							className='flex w-full'
						>
							Sunting
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='flex cursor-pointer items-center text-destructive focus:text-destructive'
						onSelect={() => setShowDeleteAlert(true)}
					>
						Hapus
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Apakah Anda yakin ingin menghapus kegiatan ini?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Tindakan ini tidak dapat dibatalkan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async (event) => {
								event.preventDefault();
								deleteKegiatan(kegiatan.id);
							}}
							className='bg-red-600 focus:ring-red-600'
						>
							{isLoading ? (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<Icons.trash className='mr-2 h-4 w-4' />
							)}
							<span>Hapus</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
