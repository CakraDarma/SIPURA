'use client';

import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/Icons';
import { MainNavItem } from '@/types';
import { useParams } from 'next/navigation';

interface MobileNavProps {
	items: MainNavItem[];
	children?: React.ReactNode;
	setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNav({
	items,
	children,
	setShowMobileMenu,
}: MobileNavProps) {
	useLockBody();
	const params = useParams();
	return (
		<div
			className={cn(
				'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden'
			)}
		>
			<div className='relative z-20 grid gap-6 p-4 rounded-md shadow-md bg-popover text-popover-foreground'>
				<Link href='/' className='flex items-center space-x-2'>
					<Icons.logo />
					<span className='font-bold'>{siteConfig.name}</span>
				</Link>
				<nav className='grid grid-flow-row text-sm auto-rows-max'>
					{items.map((item, index) => (
						<Link
							key={index}
							href={'/pura'}
							className={cn(
								'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
								item.disabled && 'cursor-not-allowed opacity-60'
							)}
							onClick={() => {
								setShowMobileMenu(false);
							}}
						>
							{item.title}
						</Link>
					))}
				</nav>
				{children}
			</div>
		</div>
	);
}
