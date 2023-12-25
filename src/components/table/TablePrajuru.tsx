import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { User } from '@prisma/client';
import PelinggihOperations from '@/components/operations/PelinggihOperations';

interface TableDataProps {
	data:
		| Pick<User, 'id' | 'name' | 'email' | 'alamat' | 'telepon'>[]
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
					<TableHead>Created at</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.name}</TableCell>
						<TableCell>{data.email}</TableCell>
						<TableCell>{data.telepon}</TableCell>
						<TableCell>{data.alamat}</TableCell>
						<TableCell className='flex justify-end '>
							<PelinggihOperations pelinggih={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
