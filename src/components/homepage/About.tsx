import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/Button';
const About = () => {
	return (
		<div className='md:py-20 md:container max-w-7xl'>
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
				<div className='bg-orange-light w-full md:w-[801px] h-[725px] xl:items-end items-center flex flex-col box-border px-16 pt-32 pb-[80px]'>
					<div className='flex flex-col'>
						<h2 className='text-3xl font-medium text-white md:text-4xl font-heading'>
							SIPura
						</h2>
						<p className='max-w-sm mt-6 font-sans text-lg font-light leading-normal text-white sm:text-xl'>
							SIPura adalah sistem informasi dan virtual tour pura yang
							memungkinkan Anda untuk mengakses dan menjelajahi pura secara
							online
						</p>
						<br />
						<p className='max-w-sm mt-6 font-sans text-lg font-light leading-normal text-white sm:text-xl'>
							Nikmati pengalaman mengakses informasi mengenai pura secara cepat
							dan interaktif untuk menjaga warisan budaya yang bernilai
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
