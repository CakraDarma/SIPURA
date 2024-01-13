import React from 'react';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { User } from '@prisma/client';
import UserOperations from '../operations/UserOperations';

interface TableDataProps {
	data: User[] | undefined;
}
export default function TablePura({ data }: TableDataProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nama</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Thumbnail</TableHead>
					<TableHead>Telepon</TableHead>
					<TableHead>Role</TableHead>
					<TableHead className='text-right'>Aksi</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((data) => (
					<TableRow key={data.id}>
						<TableCell className='font-medium'>{data.name}</TableCell>
						<TableCell>{data.email}</TableCell>
						<TableCell>
							<Link
								className='text-blue-400 underline'
								href={data.image ?? ''}
								target='_blank'
							>
								Lihat Gambar
							</Link>
						</TableCell>
						<TableCell>{data.telepon}</TableCell>
						<TableCell>{data.role}</TableCell>
						<TableCell className='flex justify-end '>
							<UserOperations user={{ id: data.id }} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
