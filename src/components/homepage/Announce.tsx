import { blogConfig } from '@/config/blog';
import Image from 'next/image';
import Link from 'next/link';

const announce = () => {
	return (
		<div className='container py-20 max-w-7xl'>
			<div className='flex flex-col justify-start my-6'>
				<h1 className='self-stretch w-96 text-zinc-800 '>
					Informasi, Pengumuman, Acara Terbaru
				</h1>
			</div>
			{/* box */}
			{blogConfig?.length ? (
				<div className='flex flex-col items-center justify-center gap-12 mt-6 md:flex-row'>
					{blogConfig?.map((item, index) => (
						<Link
							className='flex-col justify-start items-start inline-flex gap-4 w-[405px]'
							key={index}
							href={item.href}
						>
							<Image
								src='/images/announce.png'
								alt='Announce'
								width={1000}
								height={1000}
								quality={100}
								className='w-[405px] h-[234.18px] object-cover'
							/>
							<div className='flex flex-col items-center justify-start gap-3'>
								<div className='text-xs font-bold leading-4 text-zinc-800'>
									{item.date}
								</div>
								<h3 className='text-2xl font-medium leading-4 text-center text-zinc-800'>
									{item.title}
								</h3>
								<hr className='w-48 h-1 mx-auto my-4 bg-orange-dark'></hr>
								<div className=' text-center text-zinc-800 text-xs font-normal leading-[18.31px]'>
									{item.content}
								</div>
							</div>
						</Link>
					))}
				</div>
			) : null}
		</div>
	);
};

export default announce;
