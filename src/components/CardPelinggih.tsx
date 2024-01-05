'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pelinggih } from '@prisma/client';
import { useParams } from 'next/navigation';

interface CardPelinggihProps {
	pelinggih: Pelinggih;
}

export default async function CardPelinggih({ pelinggih }: CardPelinggihProps) {
	const pRef = useRef<HTMLParagraphElement>(null);
	const params = useParams();
	return (
		<Link href={`/pura/${params.puraId}/pelinggih/${pelinggih.id}`}>
			<div
				className='relative flex max-w-[16rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md max-h-[400px] overflow-clip'
				ref={pRef}
			>
				<div className='relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border min-h-[224px]'>
					<Image
						src={`${pelinggih.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='w-full h-[224px] object-cover'
					/>
				</div>
				<div className='p-6'>
					<h4 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
						{pelinggih.nama}
					</h4>
					<p className='block mt-3 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700'>
						{pelinggih.konten}
					</p>
					<div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent'></div>
				</div>
			</div>
		</Link>
	);
}
