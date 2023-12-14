import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
const About = () => {
	return (
		<div className='py-20 md:container max-w-7xl'>
			<div className='flex flex-row items-center justify-center w-full '>
				<div className='hidden w-60 xl:block'>
					<div className='w-[515px] h-[719px] relative top-[-65px] z-10'>
						<Image
							src='/images/about.jpg'
							alt='About'
							fill
							className='object-top'
						/>
					</div>
				</div>
				<div className='bg-orange-light w-full md:w-[801px] h-[725px] xl:items-end items-center flex flex-col box-border px-16 md:pt-[140px] pb-[80px]'>
					<div className='flex flex-col'>
						<h1 className='text-white text-2xl md:text-4xl font-medium leading-[76.80px] font-heading'>
							Pura
						</h1>
						<p className='max-w-sm mt-6 text-base font-light leading-normal text-white '>
							Pura adalah istilah dalam bahasa Indonesia untuk merujuk pada kuil
							Hindu. Kuil-kuil Hindu di Bali umumnya disebut sebagai pura,
							sedangkan di India dan negara-negara lain, mungkin memiliki
							istilah yang berbeda.
						</p>
						<br />
						<p className='max-w-sm text-base font-light leading-normal text-white '>
							Pura adalah tempat suci bagi umat Hindu, tempat mereka melakukan
							ritual keagamaan, berdoa, dan bersembahyang kepada para dewa.
							Arsitektur pura biasanya dipengaruhi oleh gaya arsitektur Hindu,
							dan biasanya memiliki struktur bangunan yang kompleks, berbagai
							patung, relief, dan ornamen yang menarik.
						</p>
						<div className='flex justify-center mt-16'>
							<Button
								variant='outline'
								className='text-white bg-orange-light hover:bg-orange-dark'
							>
								Selengkapnya
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
