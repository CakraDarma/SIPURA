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
						<TableCell>{data.nama}</TableCell>
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
