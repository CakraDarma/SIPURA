'use client';

import CloseModal from '@/components/CloseModal';
import SignIn from '@/components/SignIn';
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
					className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'
					ref={modalRef}
				>
					<div className='absolute top-4 right-4'>
						<CloseModal />
					</div>

					<SignIn />
				</div>
			</div>
		</div>
	);
};

export default Page;
