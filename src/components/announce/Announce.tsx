import { blogConfig } from '@/config/blog';
import Link from 'next/link';

const announce = () => {
	return (
		<div className='max-w-7xl container mx-auto pt-12'>
			<div className='flex-col justify-start flex my-6'>
				<h1 className='w-96 text-zinc-800 self-stretch'>
					Informasi, Pengumuman, Acara Terbaru
				</h1>
			</div>
			<div className='flex-col justify-center items-center flex'>
				<div className='justify-start items-start inline-flex'>
					{/* box */}
					{blogConfig?.length ? (
						<nav className='hidden gap-6 md:flex'>
							{blogConfig?.map((item, index) => (
								<Link
									className='flex-col justify-start items-start inline-flex w-96 gap-4'
									key={index}
									href={item.href}
								>
									<img
										className='w-[405px] h-[234.18px] object-cover'
										src='/pura.png'
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
						</nav>
					) : null}
				</div>
				<Link
					className='w-64 px-12 py-4 bg-red-500 flex-col justify-center items-center inline-flex my-20'
					href={'/'}
				>
					<div className='text-white text-sm font-bold leading-normal'>
						Berita Lebih Banyak
					</div>
				</Link>
			</div>
		</div>
	);
};

export default announce;
