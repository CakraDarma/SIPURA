import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pura } from '@prisma/client';
import { db } from '@/lib/db';
import PuraOperations from '@/components/operations/PuraOperations';
import { getAuthSession } from '@/lib/auth';

interface CardPuraProps {
	pura: Pura;
	link: string;
}

export default async function CardPuras({ pura, link }: CardPuraProps) {
	const result = await db.desa.findUnique({
		where: { id: `${pura.desaId}` }, // Gantilah "your-desa-id" dengan ID desa yang diinginkan
		select: {
			desa: true,
			kecamatan: {
				select: {
					kecamatan: true,
					kabupaten: {
						select: {
							kabupaten: true,
							provinsi: {
								select: {
									provinsi: true,
								},
							},
						},
					},
				},
			},
		},
	});
	const formattedResult = `Desa ${result?.desa}, Kecamatan ${result?.kecamatan?.kecamatan}, Kabupaten ${result?.kecamatan?.kabupaten?.kabupaten}, Provinsi ${result?.kecamatan?.kabupaten?.provinsi?.provinsi}`;

	const session = await getAuthSession();
	return (
		<div className='flex w-full sm:max-w-[23rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg'>
			<Link href={link}>
				<div>
					<div className='relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40'>
						<Image
							src={`${pura.thumbnail}`}
							alt='Announce'
							width={1000}
							height={1000}
							quality={100}
							className='w-full sm:w-[336px] h-[224px] object-cover'
						/>
					</div>
					<div className='p-6'>
						<div className='flex items-center justify-between mb-3'>
							<h5 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
								{pura.name}
							</h5>
						</div>
						<p className='block font-sans text-sm antialiased font-light leading-relaxed text-gray-500'>
							{formattedResult}
						</p>
					</div>
				</div>
			</Link>
			<div className='flex flex-row justify-end w-full'>
				{
					// @ts-ignore
					session?.user.role === 'ADMIN' ? (
						<PuraOperations pura={{ id: pura.id, name: pura.name }} />
					) : null
				}
			</div>
		</div>
	);
}
