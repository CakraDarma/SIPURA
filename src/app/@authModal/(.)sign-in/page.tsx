'use client';

import CloseModal from '@/components/CloseModal';
import SignIn from '@/components/SignIn';
import { Icons } from '@/components/icons';
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
		<div className='fixed inset-0 bg-zinc-900/20 z-50'>
			<div className='container flex items-center h-full max-w-lg mx-auto'>
				<div
					className='relative bg-white w-full h-fit pt-16 pb-11 px-9 rounded-lg'
					ref={modalRef}
				>
					<div className='absolute top-4 right-4 px-5'>
						<CloseModal />
					</div>
					<div className='flex flex-col space-y-2 text-center'>
						<Icons.logo className='mx-auto h-6 w-6' />
						<h1 className='text-2xl font-medium tracking-tight mb-2'>Login</h1>
					</div>
					<SignIn />
				</div>
			</div>
		</div>
	);
};

export default Page;
