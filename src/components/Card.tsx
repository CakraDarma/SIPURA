'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
	thumbnail: string | null;
	deskripsi: any;
	nama: string;
	link: string;
}

export default async function Card({
	thumbnail,
	deskripsi,
	nama,
	link,
}: CardProps) {
	const pRef = useRef<HTMLParagraphElement>(null);

	const truncateDescription = (description: string, maxCharacters: number) => {
		if (description.length > maxCharacters) {
			return description.slice(0, maxCharacters) + ' ...';
		}
		return description;
	};

	const truncatedDescription = truncateDescription(deskripsi, 80);
	return (
		<div className=' relative flex-col flex  rounded-xl bg-white  text-gray-700 shadow-md overflow-clip bg-clip-border h-[431px]'>
			<div
				className='relative flex max-w-[17rem] overflow-clip bg-clip-border flex-col'
				ref={pRef}
			>
				<div className='relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border min-h-[224px]'>
					<Image
						src={`${thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='w-full h-[224px] object-cover'
					/>
				</div>
				<div className='p-6'>
					<h4 className='block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
						{nama}
					</h4>
					<p className='block mt-3 font-sans text-sm antialiased font-normal leading-relaxed text-gray-700'>
						{truncatedDescription}
					</p>
					<div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent'></div>
				</div>
			</div>
			<div className='absolute bottom-0 left-0 z-20 w-full px-4 py-4 text-sm bg-gray-50 sm:px-6'>
				<Link href={link} className='flex items-center gap-2 w-fit'>
					Baca Selengkapnya
				</Link>
			</div>
		</div>
	);
}
