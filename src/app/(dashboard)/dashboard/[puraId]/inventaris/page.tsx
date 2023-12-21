'use client';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import Pelinggih from '@/components/inventaris/Pelinggih';
import Pratima from '@/components/inventaris/pratima';
import { buttonVariants } from '@/components/ui/Button';
import { kategoriInventaris } from '@/config/form';
import Link from 'next/link';
import { useState } from 'react';

interface InventarisPageProps {
	params: {
		puraId: string;
	};
}

const InventarisPage = ({ params }: InventarisPageProps) => {
	const [inventaris, setInventaris] = useState('PELINGGIH');
	const listInventaris = kategoriInventaris;

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Inventaris Pura'
				text='Kelola inventaris di dalam Pura.'
			/>
			<div className='flex flex-row justify-between'>
				<select
					onChange={(e) => setInventaris(e.target.value)}
					className=' rounded-md border border-gray-500 bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-gray-700 focus:shadow-md w-56'
				>
					<option value='' className='text-gray-500'>
						-- Pilih Kategori Inventaris --
					</option>
					{listInventaris.map((data) => (
						<option key={data.id} value={data.value}>
							{data.kategori}
						</option>
					))}
				</select>
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-60',
					})}
					href={`/dashboard/${params.puraId}/inventaris/create`}
				>
					Tambahkan Kegiatan
				</Link>
			</div>
			<div>{inventaris == 'PELINGGIH' ? <Pelinggih /> : <Pratima />}</div>
		</DashboardShell>
	);
};

export default InventarisPage;
