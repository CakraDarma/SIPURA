import Card from '@/components/Card';
import { db } from '@/lib/db';
import React from 'react';

interface VirtualTourPuraPageProps {
	params: {
		puraId: string;
		virtualTourId: string;
	};
}

export default async function VirtualTourPuraPage({
	params,
}: VirtualTourPuraPageProps) {
	const virtualTour = await db.virtualTour.findFirst({
		where: {
			id: params.virtualTourId,
		},
		include: {
			user: true,
		},
	});
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			virtualTours: {
				take: 4,
				where: {
					id: {
						not: params.virtualTourId, // Mengecualikan id tertentu
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			user: true,
		},
	});
	return (
		<section className='overflow-hidden text-gray-700 bg-white body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<iframe
					title='Virtual Tour'
					width='100%'
					height='600'
					src={virtualTour?.virtualTour}
					allowFullScreen
				></iframe>
			</div>
			<div className='container mb-10 max-w-7xl'>
				<div className='flex flex-col mx-auto lg:w-4/5'>
					<div className='flex flex-col gap-2 mb-4 border-b-2 border-gray-200'>
						<h3 className='font-sans text-xl font-semibold md:text-2xl'>
							Topik Keterkaitan
						</h3>
						<p className='font-sans text-base md:text-lg font-extralight'>
							Beberapa topik yang terkait dengan data tersebut
						</p>
					</div>
					<div className='flex flex-col items-center justify-between gap-6 p-3 sm:flex-row'>
						{pura?.virtualTours.map((virtualTour) => (
							<Card
								key={virtualTour.id}
								thumbnail={virtualTour.thumbnail}
								deskripsi={virtualTour?.nama}
								nama={virtualTour.nama}
								link={`pura/${pura.id}/virtualTour/${virtualTour.id}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
		// <div className='container py-10 max-w-7xl'>
		// 	<h2 className='mb-6 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
		// 		Virtual Tour
		// 	</h2>

		// 	{pura?.virtualTours.length ? (
		// 		<div className='flex flex-col flex-wrap items-center justify-center gap-10 mb-10 md:items-start md:flex-row'>
		// 			{pura.virtualTours.map((virtualTour) => (
		// 				<div key={virtualTour.id} className='w-full'>
		// 					<iframe
		// 						title='Virtual Tour'
		// 						width='100%'
		// 						height='600'
		// 						src={virtualTour.virtualTour}
		// 						allowFullScreen
		// 					></iframe>
		// 					<img src={virtualTour.virtualTour} alt='f' />
		// 				</div>
		// 			))}
		// 		</div>
		// 	) : (
		// 		<EmptyPlaceholder>
		// 			<EmptyPlaceholder.Icon name='kegiatan' />
		// 			<EmptyPlaceholder.Title>Belum ada VirtualTour</EmptyPlaceholder.Title>
		// 			<EmptyPlaceholder.Description>
		// 				Belum ada VirtualTour yang ditambahkan
		// 			</EmptyPlaceholder.Description>
		// 		</EmptyPlaceholder>
		// 	)}
		// </div>
	);
}
