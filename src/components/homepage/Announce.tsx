import { db } from '@/lib/db';
import CardPuras from '@/components/CardPuras';

const announce = async () => {
	const pura = await db.pura.findMany({
		where: {
			actived: true,
		},
		take: 3,
		orderBy: {
			updatedAt: 'desc',
		},
	});

	return (
		<div className='container py-20 max-w-7xl'>
			<div className='flex flex-col justify-start my-6'>
				<h2 className='text-black  heading-2'>Informasi, Pura Terbaru</h2>
			</div>
			{/* box */}
			{pura?.length ? (
				<div className='flex flex-col flex-wrap items-center justify-start gap-6 mb-10 md:flex-row'>
					{pura.map((pura, index) => (
						<CardPuras key={index} pura={pura} link={`pura/${pura.id}`} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default announce;
