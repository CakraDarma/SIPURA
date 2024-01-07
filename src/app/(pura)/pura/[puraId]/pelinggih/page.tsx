import Card from '@/components/Card';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { db } from '@/lib/db';
import React from 'react';

interface PelinggihPuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function PelinggihPuraPage({
	params,
}: PelinggihPuraPageProps) {
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			pelinggihs: {
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
				Pelinggih
			</h2>
			{pura?.pelinggihs.length ? (
				<div className='flex flex-col flex-wrap items-center justify-center gap-10 mb-10 md:items-start md:flex-row'>
					{pura.pelinggihs.map((pelinggih) => (
						<Card
							key={pelinggih.id}
							thumbnail={pelinggih.thumbnail}
							deskripsi={pelinggih?.konten}
							nama={pelinggih.nama}
							link={`pura/${pura.id}/pelinggih/${pelinggih.id}`}
						/>
					))}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada Pelinggih</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Belum ada Pelinggih yang ditambahkan
					</EmptyPlaceholder.Description>
				</EmptyPlaceholder>
			)}
		</div>
	);
}
