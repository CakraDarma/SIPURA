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
import { Pratima } from '@prisma/client';
import PratimaOperations from '@/components/operations/PratimaOperations';

interface TableDataProps {
	data:
		| Pick<
				Pratima,
				'id' | 'nama' | 'createdAt' | 'tahunPeninggalan' | 'thumbnail'
		  >[]
		| undefined;
}
export default function TablePratima({ data }: TableDataProps) {
	return (
		<Table>
			<TableCaption>Data Pratima Pura.</TableCaption>
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
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.nama}</TableCell>
						<TableCell>{data.tahunPeninggalan}</TableCell>
						<TableCell>{data.nama}</TableCell>
						<TableCell>{data.nama}</TableCell>
						<TableCell className='flex justify-end '>
							<PratimaOperations pratima={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
