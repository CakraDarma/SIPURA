'use client';

import { Button, buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg bg-gray-900'>
			<div className='text-center'>
				<p className='text-base font-semibold text-emerald-100'>
					Terjadi Kesalahan
				</p>
				<h1 className='mt-4 text-3xl font-bold tracking-tight text-white'>
					{error.message || 'Terjadi kesalahan'}
				</h1>
				<p className='mt-6 text-base leading-7 text-zinc-600'>
					Please try again later or contact support if the problem persistant
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Button onClick={reset}>Try again</Button>
					<Link href='/' className={buttonVariants({ variant: 'outline' })}>
						Go back home
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Error;
