import EditorOutput from '@/components/EditorOutput';
import { Icons } from '@/components/Icons';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

interface PuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function Purapage({ params }: PuraPageProps) {
	const pura = await db.pura.findFirst({
		where: {
			id: params.puraId,
		},
		include: {
			user: true,
		},
	});
	if (!pura) {
		redirect('/');
	}
	return (
		<>
			<div className='container py-10 max-w-7xl'>
				<h2 className='mb-3 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
					Profil
				</h2>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-row justify-start gap-6 font-semibold'>
						<p className='flex flex-row items-center gap-2 text-base xs:text-xl'>
							<Image
								// @ts-ignore
								src={pura.user.image}
								alt='Gambar'
								className='w-5 h-5 rounded-full xs:w-6 xs:h-6'
								width={1000}
								height={1000}
							/>
							{pura.user.name}
						</p>
						<p className='flex flex-row items-center gap-2 text-base xs:text-xl'>
							<Icons.jam className='w-5 h-5 rounded-full xs:w-6 xs:h-6' />
							{formatDate(pura.createdAt)}
						</p>
					</div>
					<div className='text-lg capitalize xs:text-xl'>
						<p>Alamat: {pura.alamat}</p>
						<p>Kategori: {pura.kategori}</p>
						<p>Piodalan: {pura.piodalan}</p>
						<p>Tahun berdiri: {pura.tahunBerdiri}</p>
					</div>
				</div>
				<EditorOutput content={pura.konten} />
			</div>
		</>
	);
}
