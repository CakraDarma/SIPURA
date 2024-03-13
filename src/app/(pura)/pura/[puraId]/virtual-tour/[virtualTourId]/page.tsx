import BackButton from '@/components/BackButton';
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
			<div className='container px-5 py-4 mx-auto'>
				<div className='mb-6 lg:translate-x-36 w-fit'>
					<BackButton />
				</div>
				<iframe
					title='Virtual Tour'
					width='100%'
					height='600'
					src={virtualTour?.virtualTour}
					allowFullScreen
				></iframe>
			</div>
			<div className='container px-5 mb-10'>
				<div className='flex flex-col mx-auto lg:w-4/5'>
					<div className='flex flex-col gap-2 mb-4 border-b-2 border-gray-200'>
						<h3 className='font-sans text-xl font-semibold md:text-2xl'>
							Topik Keterkaitan
						</h3>
						<p className='font-sans text-base md:text-lg font-extralight'>
							Beberapa topik yang terkait dengan data tersebut
						</p>
					</div>
					<div className='flex flex-col items-center justify-start gap-6 p-3 sm:flex-row'>
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
	);
}
