import Card from '@/components/Card';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { db } from '@/lib/db';
import React from 'react';

interface PratimaPuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function PratimaPuraPage({
	params,
}: PratimaPuraPageProps) {
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			pratimas: {
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
				Pratima
			</h2>
			{pura?.pratimas.length ? (
				<div className='flex flex-col flex-wrap items-center justify-center gap-10 mb-10 md:items-start md:flex-row'>
					{pura.pratimas.map((pratima) => (
						<Card
							key={pratima.id}
							thumbnail={pratima.thumbnail}
							deskripsi={pratima?.konten}
							nama={pratima.nama}
							link={`pura/${pura.id}/pratima/${pratima.id}`}
						/>
					))}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada Pratima</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Belum ada Pratima yang ditambahkan
					</EmptyPlaceholder.Description>
				</EmptyPlaceholder>
			)}
		</div>
	);
}
