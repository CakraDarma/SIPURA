import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/Card';
import BackButton from '@/components/BackButton';

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
		<section className='flex flex-col gap-10 overflow-hidden text-gray-700 bg-white body-font'>
			<div className='container px-5 py-4 mx-auto'>
				<div className='lg:translate-x-36 w-fit '>
					<BackButton />
				</div>
				<div className='flex flex-wrap justify-between mx-auto lg:w-4/5'>
					<Image
						src={`${pelinggih.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='object-cover object-center w-full border border-gray-200 rounded md:w-1/2'
					/>
					<div className='w-full mt-6 md:w-1/2 md:pl-10 md:py-6 md:mt-0'>
						<h2 className='text-sm tracking-widest text-gray-500 '>
							Pelinggih
						</h2>
						<h1 className='mb-1 text-3xl font-semibold text-gray-900 '>
							{pelinggih.nama}
						</h1>
						<div className='flex mb-4'>
							<span className='flex items-center'>
								Dikirim oleh: {pelinggih.user.name}
							</span>
						</div>
						<p className='text-xl leading-relaxed text-justify'>
							{pelinggih.konten}
						</p>
					</div>
				</div>
			</div>
			<div className='container px-5 mb-10 '>
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
							<Card
								key={pelinggih.id}
								thumbnail={pelinggih.thumbnail}
								deskripsi={pelinggih?.konten}
								nama={pelinggih.nama}
								link={`pura/${pura.id}/pelinggih/${pelinggih.id}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PelinggihPuraPage;
