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
		<div className='flex md:max-w-[24rem] flex-col rounded-xl bg-white text-gray-700 shadow-lg '>
			<Link
				href={link}
				className='mx-4 mt-4 overflow-hidden text-white rounded-xl '
			>
				<Image
					src={`${pura.thumbnail}`}
					alt='Announce'
					width={1000}
					height={1000}
					quality={100}
					className='object-cover w-full h-[234px]'
				/>
				<div className='p-6'>
					<div className='flex items-center justify-between mb-3'>
						<h5 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-black-light'>
							{pura.name}
						</h5>
					</div>
					<p className='block font-sans text-sm antialiased font-light leading-relaxed text-gray-500'>
						{formattedResult}
					</p>
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
