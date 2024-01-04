import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Hero from '@/components/Hero';
import KegiatanList from '@/components/KegiatanList';
import PuraNav from '@/components/PuraNav';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

interface kegiatanPuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function kegiatanPurapage({
	params,
}: kegiatanPuraPageProps) {
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			kegiatans: {
				orderBy: {
					createdAt: 'desc',
				},
			},
			user: true,
		},
	});
	if (!pura) {
		redirect('/');
	}
	return (
		<>
			<Hero
				imageUrl={pura?.thumbnail}
				heading={pura?.name}
				text='Temukan Informasi Pura'
			/>
			<PuraNav />
			<div className='container py-10 max-w-7xl'>
				<h2 className='mb-6 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
					Kegiatan
				</h2>
				{pura?.kegiatans.length ? (
					<div>
						{pura.kegiatans.map((kegiatan) => (
							<KegiatanList
								key={kegiatan.id}
								pura={pura}
								userName={pura.user.name}
								kegiatan={kegiatan}
							/>
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Belum ada postingan</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Belum ada postingan
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				)}
			</div>
		</>
	);
}
