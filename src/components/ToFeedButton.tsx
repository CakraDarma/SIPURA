'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/Button';

const ToFeedButton = () => {
	const pathname = usePathname();

	// if path is /r/[slug], turn into /
	// if path is /r/[slug]/post/[slug2], turn into /r/[slug] index 1 dan 2

	const subredditPath = getSubredditPath(pathname);

	return (
		<a href={subredditPath} className={buttonVariants({ variant: 'ghost' })}>
			<ChevronLeft className='w-4 h-4' />
			{subredditPath === '/' ? 'Beranda' : 'Kembali'}
		</a>
	);
};

const getSubredditPath = (pathname: string) => {
	const splitPath = pathname.split('/');
	// /dashboard/agung/kegiatan
	// Array(4)[('', 'dashboard', 'agung', 'kegiatan')];
	if (splitPath.length === 3) return '/';
	else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
	// default path, in case pathname does not match expected format
	else return '/';
};

export default ToFeedButton;
