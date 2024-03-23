'use client';

import { capitalizeFirstLetter } from '@/lib/utils';
import { Banten, User } from '@prisma/client';
import React, { useState } from 'react';

interface BantenProps {
	banten: Banten;
	user: User;
}

function BantenContent({ banten, user }: BantenProps) {
	const [showDescription, setShowDescription] = useState(true);
	return (
		<div className='w-full mt-6 md:w-1/2 md:pl-10 md:py-6 md:mt-0'>
			<h2 className='text-sm tracking-widest text-gray-500 '>Banten</h2>
			<h1 className='mb-1 text-3xl font-semibold text-gray-900 '>
				{banten.nama}
			</h1>
			<div className='flex flex-col mb-4 border-b border-gray-700'>
				<span className='flex items-center font-semibold text-black'>
					{`Kategori: Banten ${capitalizeFirstLetter(banten.kategori)}`}
				</span>
				<span className='flex items-center'>Dikirim oleh: {user.name}</span>
			</div>
			<div className='flex flex-row justify-between py-2 md:w-[50%] mb-2 text-xl'>
				<button
					onClick={() => setShowDescription(true)}
					className={`focus:outline-none ${
						showDescription
							? 'font-bold border-b-2 border-orange-light text-orange-light '
							: ''
					}`}
				>
					Deskripsi
				</button>

				{
					<button
						onClick={() => setShowDescription(false)}
						className={`focus:outline-none ${
							!showDescription
								? 'font-bold border-b-2 border-orange-light text-orange-light'
								: ''
						}`}
					>
						Komponen
					</button>
				}
			</div>
			{showDescription ? (
				<p className='text-xl leading-relaxed text-justify'>
					{banten.deskripsi}
				</p>
			) : (
				<p className='text-xl leading-relaxed text-justify'>
					{banten.komponen}
				</p>
			)}
		</div>
	);
}

export default BantenContent;
