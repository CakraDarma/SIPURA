'use client';

import CloseModal from '@/components/CloseModal';
import SignIn from '@/components/form/SignIn';
import { Icons } from '@/components/Icons';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const Page = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [isShowing, setIsShowing] = useState<boolean>(false);
	useOnClickOutside(modalRef, () => {
		setIsShowing(true);
	});

	if (isShowing == true) {
		router.back();
	}
	return (
		<div className='fixed inset-0 z-50 bg-zinc-900/20'>
			<div className='container flex items-center h-full max-w-lg mx-auto'>
				<div
					className='relative w-full pt-16 bg-white rounded-lg h-fit pb-11 px-9'
					ref={modalRef}
				>
					<div className='absolute px-5 top-4 right-4'>
						<CloseModal />
					</div>
					<div className='flex flex-col space-y-2 text-center'>
						<Icons.logo className='w-6 h-6 mx-auto' />
						<h1 className='mb-2 text-2xl font-medium tracking-tight'>Login</h1>
					</div>
					<SignIn />
				</div>
			</div>
		</div>
	);
};

export default Page;
