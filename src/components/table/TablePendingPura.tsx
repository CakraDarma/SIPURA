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

interface TableDataProps {
	data:
		| Pick<
				Pura,
				'id' | 'name' | 'alamat' | 'thumbnail' | 'createdAt' | 'actived'
		  >[]
		| undefined;
}
export default function TablePendingPura({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama</TableHead>
					<TableHead>Alamat</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead>Status</TableHead>
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
						<TableCell
							className={`p-2 rounded-xl w-fit ${
								data.actived ? 'bg-green-500' : 'bg-yellow-500'
							} text-white`}
						>
							{data.actived ? 'Diterima' : 'Pending'}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
