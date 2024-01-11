import CardPuras from '@/components/CardPuras';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Hero from '@/components/Hero';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import { Link } from 'lucide-react';

export const metadata = {
	title: 'Pura',
	description: 'Penelusuran Pura SIPURA.',
};

export default async function purasPage() {
	const pura = await db.pura.findMany({
		where: {
			actived: true,
		},
	});

	return (
		<>
			<Hero
				imageUrl='/images/hero-list-pura.jpg'
				heading='List Pura'
				text='Temukan Informasi Pura'
			/>
			<div className='container py-20 max-w-7xl'>
				{pura?.length ? (
					<div>
						<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 md:flex-row'>
							{pura.map((pura, index) => (
								<CardPuras key={index} pura={pura} link={`pura/${pura.id}`} />
							))}
						</div>
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada Pura</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Tidak ada data Pura. Anda memiliki informasi Pura?
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				)}
			</div>
		</>
	);
}
