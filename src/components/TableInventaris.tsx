import React from 'react';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Pelinggih } from '@prisma/client';
import PelinggihOperations from './operations/PelinggihOperations';

interface TableDataProps {
	data: Pick<
		Pelinggih,
		'id' | 'nama' | 'createdAt' | 'tahunPeninggalan' | 'thumbnail'
	>[];
}
export default function TableInventaris({ data }: TableDataProps) {
	console.log(data);
	return (
		<Table>
			<TableCaption>Data Pelinggih Pura.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Nama</TableHead>
					<TableHead>Tahun dibangun</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Created at</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.nama}</TableCell>
						<TableCell>{data.tahunPeninggalan}</TableCell>
						<TableCell>{data.nama}</TableCell>
						<TableCell>{data.nama}</TableCell>
						<TableCell className=' flex justify-end'>
							<PelinggihOperations pelinggih={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
