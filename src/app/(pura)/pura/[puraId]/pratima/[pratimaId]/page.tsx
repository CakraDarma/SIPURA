import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/Card';
import BackButton from '@/components/BackButton';

interface PratimaPuraPageProps {
	params: {
		pratimaId: string;
		puraId: string;
	};
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PratimaPuraPage = async ({ params }: PratimaPuraPageProps) => {
	const pratima = await db.pratima.findFirst({
		where: {
			id: params.pratimaId,
		},
		include: {
			user: true,
		},
	});
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			pratimas: {
				take: 4,
				where: {
					id: {
						not: params.pratimaId,
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			user: true,
		},
	});

	if (!pratima) return notFound();

	return (
		<section className='flex flex-col gap-10 overflow-hidden text-gray-700 bg-white body-font'>
			<div className='container px-5 py-4 mx-auto'>
				<div className='lg:translate-x-36 w-fit '>
					<BackButton />
				</div>
				<div className='flex flex-wrap mx-auto lg:w-4/5'>
					<Image
						src={`${pratima.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='object-cover object-center w-full border border-gray-200 rounded lg:w-1/2'
					/>
					<div className='w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0'>
						<h2 className='text-sm tracking-widest text-gray-500 title-font'>
							Pratima
						</h2>
						<h1 className='mb-1 text-3xl font-semibold text-gray-900 title-font'>
							{pratima.nama}
						</h1>
						<div className='flex mb-4'>
							<span className='flex items-center'>
								Dikirim oleh: {pratima.user.name}
							</span>
						</div>
						<p className='text-xl leading-relaxed text-justify'>
							{pratima.konten}
						</p>
						<div className='flex justify-end pb-6 '></div>
					</div>
				</div>
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
						{pura?.pratimas.slice(0, 4).map((pratima) => (
							<Card
								key={pratima.id}
								thumbnail={pratima.thumbnail}
								deskripsi={pratima?.konten}
								nama={pratima.nama}
								link={`pura/${pura.id}/pratima/${pratima.id}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PratimaPuraPage;
