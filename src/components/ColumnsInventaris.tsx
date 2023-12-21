'use client';

import Link from 'next/link';
import * as React from 'react';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { ColumnsInventaris } from '@/types/form';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const ColumnsInventaris: ColumnDef<ColumnsInventaris>[] = [
	{
		accessorKey: 'kode',
		header: 'Kode',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('kode')}</div>,
	},
	{
		accessorKey: 'nama',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Nama
					<CaretSortIcon className='w-4 h-4 ml-2' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='capitalize'>{row.getValue('nama')}</div>,
	},

	{
		accessorKey: 'tahunPeninggalan',
		header: 'Tahun Peninggalan',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('tahunPeninggalan')}</div>
		),
	},
	{
		accessorKey: 'thumbnail',
		header: 'Thumbnail',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('thumbnail')} </div>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('createdAt')} </div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: async ({ row }) => {
			const datas = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='w-8 h-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<DotsHorizontalIcon className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>
							<Link href={`/maps/${datas.id}`}>View</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={`/maps/${datas.id}/edit`}>Update</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='text-red-500 '
							onClick={async () => {
								try {
									await axios.delete(
										`https://gisapis.manpits.xyz/api/ruasjalan/${datas.id}`
									);
									toast({
										description: 'Data Anda berhasil dihapus.',
									});
								} catch {
									return toast({
										title: 'Terjadi kesalahan.',
										description:
											'Data tidak berhasil dihapus. Silakan coba lagi.',
										variant: 'destructive',
									});
								}
							}}
						>
							<Link href={`/`}>Delete</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default ColumnsInventaris;
