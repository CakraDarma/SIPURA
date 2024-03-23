import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import { capitalizeFirstLetter } from '@/lib/utils';
import BantenContent from '@/components/BantenContent';

interface BantenPuraPageProps {
	params: {
		bantenId: string;
		puraId: string;
	};
}

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const BantenPuraPage = async ({ params }: BantenPuraPageProps) => {
	const banten = await db.banten.findFirst({
		where: {
			id: params.bantenId,
		},
		include: {
			user: true,
		},
	});

	if (!banten) return notFound();

	return (
		<section className='flex flex-col gap-10 overflow-hidden text-gray-700 bg-white body-font'>
			<div className='container px-5 py-4 mx-auto'>
				<div className='lg:translate-x-36 w-fit '>
					<BackButton />
				</div>
				<div className='flex flex-wrap justify-between mx-auto lg:w-4/5'>
					<Image
						src={`${banten.thumbnail}`}
						alt='Announce'
						width={1000}
						height={1000}
						quality={100}
						className='object-cover object-center w-full border border-gray-200 rounded md:w-1/2 h-[582px]'
					/>
					<BantenContent banten={banten} user={banten.user} />
				</div>
			</div>
		</section>
	);
};

export default BantenPuraPage;
