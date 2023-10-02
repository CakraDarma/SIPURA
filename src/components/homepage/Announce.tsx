import { blogConfig } from '@/config/blog';
import Image from 'next/image';
import Link from 'next/link';

const announce = () => {
	return (
		<div className='max-w-7xl container py-12'>
			<div className='flex-col justify-start flex my-6'>
				<h1 className='w-96 text-zinc-800 self-stretch'>
					Informasi, Pengumuman, Acara Terbaru
				</h1>
			</div>
			{/* box */}
			{blogConfig?.length ? (
				<div className='flex-col items-center justify-center gap-6 flex md:flex-row'>
					{blogConfig?.map((item, index) => (
						<Link
							className='flex-col justify-start items-start inline-flex w-96 gap-4'
							key={index}
							href={item.href}
						>
							<Image
								src='/pura.png'
								alt='Announce'
								width={1000}
								height={1000}
								quality={100}
								className='w-[405px] h-[234.18px] object-cover'
							/>
							<div className='flex-col justify-start items-center flex gap-3'>
								<div className='text-zinc-800 text-xs font-bold leading-4'>
									{item.date}
								</div>
								<h3 className='text-center text-zinc-800 text-2xl font-medium leading-4'>
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
