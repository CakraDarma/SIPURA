import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Pelinggih } from '@prisma/client';
import PelinggihOperations from '@/components/operations/PelinggihOperations';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface TableDataProps {
	data:
		| Pick<
				Pelinggih,
				'id' | 'nama' | 'createdAt' | 'tahunPeninggalan' | 'thumbnail'
		  >[]
		| undefined;
}
export default function TablePelinggih({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Nama</TableHead>
					<TableHead>Tahun dibangun</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.nama}</TableCell>
						<TableCell>{data.tahunPeninggalan}</TableCell>
						<Link
							className='text-blue-400 underline'
							href={data.thumbnail}
							target='_blank'
						>
							Lihat Gambar
						</Link>
						<TableCell>{formatDate(data.createdAt)}</TableCell>
						<TableCell className='flex justify-end '>
							<PelinggihOperations pelinggih={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
