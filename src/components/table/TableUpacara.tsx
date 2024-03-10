import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Pratima } from '@prisma/client';
import PratimaOperations from '@/components/operations/PratimaOperations';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface TableDataProps {
	data: Pick<Pratima, 'id' | 'nama' | 'createdAt' | 'thumbnail'>[] | undefined;
}
export default function TablePratima({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.nama}</TableCell>
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
							<PratimaOperations pratima={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
