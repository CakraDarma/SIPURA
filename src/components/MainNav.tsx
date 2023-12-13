'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MobileNav } from '@/components/MobileNav';
import { MainNavItem } from '@/types';
import { Icons } from '@/components/Icons';

interface MainNavProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
	const segment = useSelectedLayoutSegment();
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	return (
		<div className='flex gap-6 md:gap-10'>
			<Link href='/' className='items-center hidden space-x-2 md:flex'>
				<Icons.logo />
				<span className='hidden font-bold sm:inline-block'>
					{siteConfig.name}
				</span>
			</Link>
			{items?.length ? (
				<nav className='hidden gap-6 md:flex'>
					{items?.map((item, index) => (
						<Link
							key={index}
							href={item.disabled ? '#' : item.href}
							className={cn(
								'flex items-center text-lg font-medium hover:border-b-2 border-foreground sm:text-sm',
								item.href.startsWith(`/${segment}`)
									? 'text-primary'
									: 'text-foreground',
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
