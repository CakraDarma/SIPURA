import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { db } from '@/lib/db';
import React from 'react';

interface VirtualTourPuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function VirtualTourPuraPage({
	params,
}: VirtualTourPuraPageProps) {
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			virtualTours: {
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
				Virtual Tour
			</h2>

			{pura?.virtualTours.length ? (
				<div className='flex flex-col flex-wrap items-center justify-center gap-10 mb-10 md:items-start md:flex-row'>
					{pura.virtualTours.map((virtualTour) => (
						<div key={virtualTour.id} className='w-full'>
							<iframe
								title='Virtual Tour'
								width='100%'
								height='600'
								src={virtualTour.virtualTour}
								allowFullScreen
							></iframe>
							<img src={virtualTour.virtualTour} alt='f' />
						</div>
					))}
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada VirtualTour</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Belum ada VirtualTour yang ditambahkan
					</EmptyPlaceholder.Description>
				</EmptyPlaceholder>
			)}
		</div>
	);
}
