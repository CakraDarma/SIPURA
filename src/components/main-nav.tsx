'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/mobile-nav';
import { MainNavItem } from '@/types';
import { Icons } from '@/components/icons';

interface MainNavProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
	const segment = useSelectedLayoutSegment();
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	return (
		<div className='flex gap-6 md:gap-10'>
			<Link href='/' className='flex gap-2 items-center'>
				<Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
				<p className='hidden text-primary text-lg font-medium md:block text-white'>
					{siteConfig.name}
				</p>
			</Link>
			{items?.length ? (
				<nav className='hidden gap-6 md:flex'>
					{items?.map((item, index) => (
						<Link
							key={index}
							href={item.disabled ? '#' : item.href}
							className={cn(
								'flex items-center text-lg font-medium text-white  hover:border-b-2 border-gray-50 sm:text-sm',
								item.href.startsWith(`/${segment}`)
									? 'text-red-800'
									: 'text-white',
								item.disabled && 'cursor-not-allowed opacity-80'
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
			<button
				className='flex items-center space-x-2 md:hidden'
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.logo />}
				<span className='font-bold'>Menu</span>
			</button>
			{showMobileMenu && items && (
				<MobileNav items={items}>{children}</MobileNav>
			)}
		</div>
	);
}
