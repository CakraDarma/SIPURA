'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@prisma/client';

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
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { toast } from '@/hooks/use-toast';
import { Icons } from '@/components/Icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UserRolesOperationsProps {
	prajuru: Pick<User, 'id'>;
}

export default function UserRolesOperations({
	prajuru,
}: UserRolesOperationsProps) {
	const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
	const router = useRouter();
	const params = useParams();
	const { mutate: deletePrajuru, isPending } = useMutation({
		mutationFn: async (prajuruId: string) => {
			const { data } = await axios.delete(
				`/api/pura/${params.puraId}/userRoles/${prajuruId}`
			);
			return data;
		},
		onError: () => {
			return toast({
				title: 'Terjadi kesalahan.',
				description: 'Prajuru Anda tidak berhasil dihapus. Silakan coba lagi.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Prajuru Anda berhasil dihapus.',
			});
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
							Apakah Anda yakin ingin menghapus prajuru ini?
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
								deletePrajuru(prajuru.id);
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
