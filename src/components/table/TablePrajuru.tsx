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
import PrajuruOperations from '@/components/operations/PrajuruOperations';

interface TableDataProps {
	data:
		| Pick<User, 'id' | 'name' | 'email' | 'alamat' | 'telepon'>[]
		| undefined;
}
export default function TablePrajuru({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Telepon</TableHead>
					<TableHead>Alamat</TableHead>
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
							<PrajuruOperations prajuru={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
