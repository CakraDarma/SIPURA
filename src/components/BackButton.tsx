'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { split } from 'postcss/lib/list';

const BackButton = () => {
	const pathname = usePathname();

	// if path is /r/[slug], turn into /
	// if path is /r/[slug]/post/[slug2], turn into /r/[slug] index 1 dan 2

	const subredditPath = gePath(pathname);

	return (
		<Link href={subredditPath} className={buttonVariants({ variant: 'ghost' })}>
			<ChevronLeft className='w-4 h-4' />
			{subredditPath === '/' ? 'Beranda' : 'Kembali'}
		</Link>
	);
};

const gePath = (pathname: string) => {
	const splitPath = pathname.split('/');
	// /dashboard/agung/kegiatan
	// Array(4)[('', 'dashboard', 'agung', 'kegiatan')];
	if (splitPath.length === 3) return '/';
	else if (splitPath.length === 5)
		return `/${splitPath[1]}/${splitPath[2]}/${splitPath[3]}`;
	else if (splitPath.length === 4) return `/${splitPath[1]}/${splitPath[2]}`;
	else if (splitPath.length === 6)
		return `/${splitPath[1]}/${splitPath[2]}/${splitPath[3]}`;
	else return '/';
};

export default BackButton;
