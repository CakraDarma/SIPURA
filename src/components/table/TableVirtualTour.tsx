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

interface TableDataProps {
	data: Pick<VirtualTour, 'id' | 'virtualTour' | 'createdAt'>[] | undefined;
}
export default function TableVirtualTour({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Virtual Tour</TableHead>
					<TableHead>Dibuat</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.virtualTour}</TableCell>
						<TableCell>{data.id}</TableCell>
						<TableCell className='flex justify-end '>
							<VirtualTourOperations virtualTour={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
