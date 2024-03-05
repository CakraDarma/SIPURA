import Link from 'next/link';
import React from 'react';
import { Icons } from '../Icons';
import Image from 'next/image';
export default function JoinUsPage() {
	return (
		<div className='text-white bg-neutral-600'>
			<div className='container flex flex-col-reverse px-6 py-12 mx-auto space-y-6 md:h-128 md:py-32 md:flex-row md:items-center md:space-x-6 max-w-7xl gap-y-4'>
				<div className='flex flex-col items-start w-full md:items-center md:flex-row md:w-1/2'>
					<div className='max-w-lg md:mx-12 md:order-2'>
						<h2 className='text-white heading-2'>Daftarkan Objek Pura</h2>
						<p className='mt-4 text-justify text-white-dark body-1'>
							Bergabunglah dalam upaya pelestarian warisan budaya kami.
							Sumbangkan pengetahuan Anda tentang Pura dan ikut memperkaya basis
							data kami dengan informasi yang bermanfaat untuk masyarakat dan
							generasi mendatang.
						</p>
						<div className='mt-6'>
							<Link
								href='/dashboard'
								className='flex flex-row items-center justify-center gap-1 px-3 py-2 font-semibold text-center text-white transition-colors duration-200 transform rounded-md bg-orange-dark w-fit hover:bg-orange-light'
							>
								<Icons.plus className='w-5 h-5 ' color='white' />
								<span className='font-light text-white'>Daftar</span>
							</Link>
						</div>
					</div>
				</div>

				<div className='flex items-center justify-center w-full h-96 md:w-1/2'>
					<Image
						className='object-cover w-full h-full max-w-2xl rounded-md shadow-xl'
						src='/images/joinus.jpg'
						alt='join us'
						width={1000}
						height={1000}
						quality={100}
					/>
				</div>
			</div>
		</div>
	);
}
