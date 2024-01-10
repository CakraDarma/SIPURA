import React from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { VirtualTour } from '@prisma/client';
import VirtualTourOperations from '@/components/operations/VirtualTourOperations';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface TableDataProps {
	data:
		| Pick<VirtualTour, 'id' | 'virtualTour' | 'createdAt' | 'nama'>[]
		| undefined;
}
export default function TableVirtualTour({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama</TableHead>
					<TableHead>Virtual Tour</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell>{data.nama}</TableCell>
						<TableCell className='font-medium'>
							<Link
								className='text-blue-400 underline'
								href={data.virtualTour}
								target='_blank'
							>
								Lihat Virtual Tour
							</Link>
						</TableCell>
						<TableCell>{formatDate(data.createdAt)}</TableCell>
						<TableCell className='flex justify-end '>
							<VirtualTourOperations virtualTour={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
