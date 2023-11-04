import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const NotFound = () => {
	return (
		<main className='text-center'>
			<div className='h-screen w-screen flex items-center'>
				<div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
					<div className='max-w-md'>
						<div className='text-5xl font-dark font-bold'>404</div>
						<p className='text-2xl md:text-3xl font-light leading-normal'>
							Maaf, kami tidak dapat menemukan halaman ini..{' '}
						</p>
						<p className='mb-8'>
							Tapi jangan khawatir, Anda dapat menemukan banyak hal lain di
							halaman beranda kami.
						</p>

						<Link href={'/'}>
							<button className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'>
								Kembali ke beranda
							</button>
						</Link>
					</div>
					<div className='max-w-lg'>
						<Image
							src='/images/not-found.png'
							alt='Announce'
							width={1000}
							height={1000}
							quality={100}
							className='w-[405px] h-[234.18px] object-cover'
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
