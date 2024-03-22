import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Banten } from '@prisma/client';
import BantenOperations from '@/components/operations/BantenOperations';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface TableDataProps {
	data: Pick<Banten, 'id' | 'nama' | 'createdAt' | 'thumbnail'>[] | undefined;
}
export default function TableBanten({ data }: TableDataProps) {
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
								href={data.thumbnail ? data.thumbnail : '/images/no-image.jpg'}
								target='_blank'
							>
								Lihat Gambar
							</Link>
						</TableCell>
						<TableCell>{formatDate(data.createdAt)}</TableCell>
						<TableCell className='flex justify-end '>
							<BantenOperations banten={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
