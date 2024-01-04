import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pura } from '@prisma/client';
import { db } from '@/lib/db';

interface CardPuraProps {
	pura: Pura;
}

export default async function CardPuras({ pura }: CardPuraProps) {
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

	return (
		<Link href={`pura/${pura.id}`}>
			<div className='relative flex w-full max-w-[23rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg'>
				<div className='relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40'>
					<Image
						src={`${pura.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='w-[336px] h-[224px] object-cover'
					/>

					{/* <button
						className='!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
						type='button'
						data-ripple-dark='true'
					>
						<span className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								aria-hidden='true'
								className='w-6 h-6'
							>
								<path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z'></path>
							</svg>
						</span>
					</button> */}
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
	);
}
