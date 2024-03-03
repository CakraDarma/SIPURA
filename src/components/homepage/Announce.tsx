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
				<h2 className='text-4xl font-medium text-black md:text-5xl font-heading'>
					Informasi, Pura Terbaru
				</h2>
			</div>
			{/* box */}
			{pura?.length ? (
				<div className='flex flex-col flex-wrap items-center justify-center gap-6 mb-10 bg-red-300 md:flex-row'>
					{pura.map((pura, index) => (
						<CardPuras key={index} pura={pura} link={`pura/${pura.id}`} />
					))}
				</div>
			) : null}
		</div>
	);
};

export default announce;
