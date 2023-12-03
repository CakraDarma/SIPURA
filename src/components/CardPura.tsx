import { Pura } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface CardPuraProps extends React.HTMLAttributes<HTMLDivElement> {
	// pick is utility typescript
	pura: Pick<Pura, 'name'>;
}

const CardPura = ({ pura }: CardPuraProps) => {
	return (
		<Link
			className='flex-col justify-start items-start inline-flex shadow-md max-w-[300px]'
			href={`/dashboard/${pura.name}/`}
		>
			<Image
				src='/images/announce.png'
				alt='Announce'
				width={1000}
				height={1000}
				quality={100}
				className='w-full h-[150.18px] object-cover'
			/>
			<div className='flex flex-col w-full gap-3 p-2'>
				<p className='mt-3 text-xs font-bold leading-4 text-orange-dark'>
					Karangasem
				</p>
				<h3 className='text-2xl font-medium leading-4 text-black '>
					Pura {pura.name}
				</h3>
				<hr className='w-24 h-1 mx-auto my-4 bg-orange-dark'></hr>
				<p className='text-xs font-thin text-zinc-800'>
					Desa Besakih, Kecamatan Rendang, Kabupaten Karangasem
				</p>
			</div>
		</Link>
	);
};

export default CardPura;
