import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CardPelinggih from '@/components/CardPelinggih';

interface PelinggihPuraPageProps {
	params: {
		pelinggihId: string;
		puraId: string;
	};
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PelinggihPuraPage = async ({ params }: PelinggihPuraPageProps) => {
	const pelinggih = await db.pelinggih.findFirst({
		where: {
			id: params.pelinggihId,
		},
		include: {
			user: true,
		},
	});
	const pura = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			pelinggihs: {
				take: 4,
				where: {
					id: {
						not: params.pelinggihId, // Mengecualikan id tertentu
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
			user: true,
		},
	});

	if (!pelinggih) return notFound();

	return (
		<section className='overflow-hidden text-gray-700 bg-white body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<div className='flex flex-wrap mx-auto lg:w-4/5'>
					<Image
						src={`${pelinggih.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='object-cover object-center w-full border border-gray-200 rounded lg:w-1/2'
					/>
					<div className='w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0'>
						<h2 className='text-sm tracking-widest text-gray-500 title-font'>
							Pelinggih
						</h2>
						<h1 className='mb-1 text-3xl font-medium text-gray-900 title-font'>
							{pelinggih.nama}
						</h1>
						<div className='flex mb-4'>
							<span className='flex items-center'>
								Dikirim oleh: {pelinggih.user.name}
							</span>
							<span className='flex py-2 pl-3 ml-3 border-l-2 border-gray-200'>
								<a className='text-gray-500'>
									<svg
										fill='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										className='w-5 h-5'
										viewBox='0 0 24 24'
									>
										<path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
									</svg>
								</a>
								<a className='ml-2 text-gray-500'>
									<svg
										fill='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										className='w-5 h-5'
										viewBox='0 0 24 24'
									>
										<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
									</svg>
								</a>
								<a className='ml-2 text-gray-500'>
									<svg
										fill='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										className='w-5 h-5'
										viewBox='0 0 24 24'
									>
										<path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'></path>
									</svg>
								</a>
							</span>
						</div>
						<p className='leading-relaxed'>{pelinggih.konten}</p>
						<div className='flex justify-end pb-6 '>
							<button className='inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full'>
								<svg
									fill='currentColor'
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									className='w-5 h-5'
									viewBox='0 0 24 24'
								>
									<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
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
						{pura?.pelinggihs.slice(0, 4).map((pelinggih) => (
							<CardPelinggih key={pelinggih.id} pelinggih={pelinggih} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PelinggihPuraPage;