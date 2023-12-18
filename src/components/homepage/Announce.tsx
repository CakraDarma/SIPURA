import { blogConfig } from '@/config/blog';
import Image from 'next/image';
import Link from 'next/link';

const announce = () => {
	return (
		<div className='container py-20 max-w-7xl'>
			<div className='flex flex-col justify-start my-6'>
				<h2 className='text-3xl font-medium text-black md:text-4xl font-heading'>
					Informasi, Pengumuman, Acara Terbaru
				</h2>
			</div>
			{/* box */}
			{blogConfig?.length ? (
				<div className='flex flex-col items-center justify-center gap-12 mt-6 md:flex-row'>
					{blogConfig?.map((item, index) => (
						<Link
							className='inline-flex flex-col items-start justify-start w-full gap-4'
							key={index}
							href={item.href}
						>
							<Image
								src='/images/announce.png'
								alt='Announce'
								width={1000}
								height={1000}
								quality={100}
								className='w-full h-[234.18px] object-cover hover:bg-blue-300 hover:ring-sky-400'
							/>
							<div className='flex flex-col items-center justify-start gap-3'>
								<div className='font-sans text-sm font-bold leading-4 text-zinc-800'>
									{item.date}
								</div>
								<h3 className='text-2xl font-medium text-center font-heading text-zinc-800'>
									{item.title}
								</h3>
								<hr className='w-48 h-1 mx-auto my-4 bg-orange-dark'></hr>
								<p className='font-sans font-light text-justify text-zinc-800 text-md'>
									{item.content}
								</p>
							</div>
						</Link>
					))}
				</div>
			) : null}
		</div>
	);
};

export default announce;
