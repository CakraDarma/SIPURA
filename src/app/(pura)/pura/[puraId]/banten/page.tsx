import Card from '@/components/Card';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { db } from '@/lib/db';
import React from 'react';

interface BantenPuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function BantenPuraPage({ params }: BantenPuraPageProps) {
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			bantens: {
				orderBy: {
					createdAt: 'desc',
				},
			},
			user: true,
		},
	});
	return (
		<div className='container py-10 max-w-7xl'>
			<h2 className='mb-6 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
				Banten
			</h2>
			{pura?.bantens.length ? (
				<div className='flex flex-col flex-wrap items-center justify-start gap-10 mb-10 md:items-start md:flex-row'>
					{pura.bantens.map((banten) => (
						<Card
							key={banten.id}
							thumbnail={banten.thumbnail}
							deskripsi={banten?.deskripsi}
							nama={banten.nama}
							link={`pura/${pura.id}/banten/${banten.id}`}
						/>
					))}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada banten</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Belum ada banten yang ditambahkan
					</EmptyPlaceholder.Description>
				</EmptyPlaceholder>
			)}
		</div>
	);
}
