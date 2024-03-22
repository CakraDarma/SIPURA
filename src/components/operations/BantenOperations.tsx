'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Banten } from '@prisma/client';

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

interface BantenOperationsProps {
	banten: Pick<Banten, 'id'>;
}

export default function BantenOperations({ banten }: BantenOperationsProps) {
	const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
	const params = useParams();
	const router = useRouter();

	const { mutate: deleteBanten, isPending } = useMutation({
		mutationFn: async (bantenId: string) => {
			const { data } = await axios.delete(`/api/pura/banten/${bantenId}`);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Banten Anda tidak berhasil dihapus. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Banten Anda berhasil dihapus.',
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
					<DropdownMenuItem>
						<Link
							href={`/dashboard/${params.puraId}/banten/${banten.id}/edit`}
							className='flex w-full'
						>
							Sunting
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
							Apakah Anda yakin ingin menghapus banten ini?
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
								deleteBanten(banten.id);
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
		</>
	);
}
