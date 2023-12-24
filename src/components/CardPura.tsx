import { Pura } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import PuraOperations from '@/components/operations/PuraOperations';

interface CardPuraProps extends React.HTMLAttributes<HTMLDivElement> {
	// pick is utility typescript
	pura: Pick<Pura, 'name' | 'id'>;
}

const CardPura = ({ pura }: CardPuraProps) => {
	return (
		<div
			className='flex flex-col justify-center overflow-hidden bg-gray-50 h-fit'
			// href={`/dashboard/${pura.name}/`}
		>
			<div className='relative flex m-0 shadow-xl group h-72 w-80 sm:w-96 rounded-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg'>
				<Link
					href={`/dashboard/${pura.id}/`}
					className='z-10 w-full h-full overflow-hidden transition duration-300 ease-in-out border border-gray-200 rounded-xl opacity-80 group-hover:opacity-100 dark:border-gray-700 dark:opacity-70'
				>
					<Image
						src='/images/announce.png'
						className='block object-cover object-center w-full h-full transition duration-300 transform scale-100 opacity-100 animate-fade-in group-hover:scale-110'
						alt=''
						width={1000}
						height={1000}
						quality={100}
					/>
				</Link>
				<div className='absolute bottom-0 z-20 pb-4 m-0 transition duration-300 ease-in-out ps-4 group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110'>
					<h1 className='font-serif text-2xl font-bold text-white shadow-xl'>
						Pura {pura.name}
					</h1>
					<h1 className='text-sm font-light text-gray-200 shadow-xl'>
						Desa Besakih, Kecamatan Rendang, Kabupaten Karangasem
					</h1>
					<div className='flex justify-end w-[90%] mr-32'>
						<PuraOperations pura={{ id: pura.id, name: pura.name }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardPura;
