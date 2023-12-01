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
					Silakan coba lagi nanti atau hubungi Admin jika masalah berlanjut.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Button onClick={reset}>Coba lagi</Button>
					<Link href='/' className={buttonVariants({ variant: 'outline' })}>
						Kembali ke halaman utama
					</Link>
				</div>
			</div>
		</main>
	);
};

export default Error;
