import React from 'react';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Pura } from '@prisma/client';
// import PuraOperations from '@/components/operations/PuraOperations';
import { formatDate } from '@/lib/utils';
import ConfirmPuraOperations from '@/components/operations/ConfirmPuraOperations';

interface TableDataProps {
	data:
		| Pick<Pura, 'id' | 'name' | 'alamat' | 'thumbnail' | 'createdAt'>[]
		| undefined;
}
export default function TablePura({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Nama</TableHead>
					<TableHead>Alamat</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.name}</TableCell>
						<TableCell>{data.alamat}</TableCell>
						<TableCell>
							<Link
								className='text-blue-400 underline'
								href={data.thumbnail}
								target='_blank'
							>
								Lihat Gambar
							</Link>
						</TableCell>
						<TableCell>{formatDate(data.createdAt)}</TableCell>
						<TableCell className='flex justify-end '>
							<ConfirmPuraOperations pura={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
