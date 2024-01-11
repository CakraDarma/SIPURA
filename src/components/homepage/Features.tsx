import React from 'react';
import { Icons } from '@/components/Icons';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

export default function Features() {
	return (
		<div className=' bg-neutral-900'>
			<div className='container my-12'>
				<h1 className='text-4xl font-semibold text-orange-dark font-heading'>
					Apa itu SIPura
				</h1>
			</div>
			<div className='container flex flex-col items-center justify-center gap-2 md:flex-row'>
				<div className='flex flex-row border-2 border-gray-300 rounded-lg shadow-lg w-fit'>
					<Icons.pura className='w-16 h-16 mb-5 font-thin text-gray-400' />
					<div className='flex flex-col gap-4 max-w-[25%]'>
						<h2 className='text-2xl font-medium text-gray-300 font-heading'>
							Informasi jalan
						</h2>
						<p className='font-sans text-base font-normal text-gray-400'>
							sadfasdffs daf ssdfaaaaaaaaaaaaaaa dsfafsdfas
						</p>
						<Link
							className={buttonVariants({
								variant: 'outline',
								className: 'w-fit h-fit p-6 mb-10 bg-neutral-900 text-white',
							})}
							href={`/`}
						>
							Lihat
						</Link>
					</div>
				</div>
				<div className='flex flex-row border-2 border-gray-300 rounded-lg shadow-lg w-fit'>
					<Icons.pura className='w-16 h-16 mb-5 font-thin text-gray-400' />
					<div className='flex flex-col gap-4 max-w-[25%]'>
						<h2 className='text-2xl font-medium text-gray-300 font-heading'>
							Informasi jalan
						</h2>
						<p className='font-sans text-base font-normal text-gray-400'>
							sadfasdffs daf ssdfaaaaaaaaaaaaaaa dsfafsdfas
						</p>
						<Link
							className={buttonVariants({
								variant: 'outline',
								className: 'w-fit h-fit p-6 mb-10 bg-neutral-900 text-white',
							})}
							href={`/`}
						>
							Lihat
						</Link>
					</div>
				</div>
				<div className='flex flex-row border-2 border-gray-300 rounded-lg shadow-lg w-fit'>
					<Icons.pura className='w-16 h-16 mb-5 font-thin text-gray-400' />
					<div className='flex flex-col gap-4 max-w-[25%]'>
						<h2 className='text-2xl font-medium text-gray-300 font-heading'>
							Informasi jalan
						</h2>
						<p className='font-sans text-base font-normal text-gray-400'>
							sadfasdffs daf ssdfaaaaaaaaaaaaaaa dsfafsdfas
						</p>
						<Link
							className={buttonVariants({
								variant: 'outline',
								className: 'w-fit h-fit p-6 mb-10 bg-neutral-900 text-white',
							})}
							href={`/`}
						>
							Lihat
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
