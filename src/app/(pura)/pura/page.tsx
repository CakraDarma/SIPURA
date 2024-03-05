import CardPuras from '@/components/CardPuras';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Hero from '@/components/Hero';
import { db } from '@/lib/db';

export const metadata = {
	title: 'Pura',
	description: 'Penelusuran Pura SIPura.',
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
				heading='Daftar Pura'
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
							Tidak ada data pura. Anda memiliki informasi pura?
						</EmptyPlaceholder.Description>
					</EmptyPlaceholder>
				)}
			</div>
		</>
	);
}
