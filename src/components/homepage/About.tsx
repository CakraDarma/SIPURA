import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
const About = () => {
	return (
		<div className='max-w-7xl container py-20'>
			<div className='w-full flex flex-row justify-center items-center relative z-10'>
				<div>
					<div className='w-[515px] h-[719px] absolute top-[-65px] left-0 z-10'>
						<Image src='/pura.png' alt='About' fill className='object-cover' />
					</div>
					<div className='bg-orange-light w-[801px] h-[725px] items-end flex flex-col box-border pr-16 pt-[140px] pb-[80px]'>
						<div className='flex flex-col'>
							<h1 className='text-white'>Pura</h1>
							<p className=' text-white text-base font-light leading-normal max-w-sm mt-6'>
								Pura adalah istilah dalam bahasa Indonesia untuk merujuk pada
								kuil Hindu. Kuil-kuil Hindu di Bali umumnya disebut sebagai
								pura, sedangkan di India dan negara-negara lain, mungkin
								memiliki istilah yang berbeda.
							</p>
							<br />
							<p className=' text-white text-base font-light leading-normal max-w-sm'>
								Pura adalah tempat suci bagi umat Hindu, tempat mereka melakukan
								ritual keagamaan, berdoa, dan bersembahyang kepada para dewa.
								Arsitektur pura biasanya dipengaruhi oleh gaya arsitektur Hindu,
								dan biasanya memiliki struktur bangunan yang kompleks, berbagai
								patung, relief, dan ornamen yang menarik.
							</p>
							<div className='flex justify-center mt-16'>
								<Button
									variant='outline'
									className='bg-orange-light text-white hover:bg-orange-dark'
								>
									Selengkapnya
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
