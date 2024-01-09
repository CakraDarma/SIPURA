'use client';

import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { MobileNav } from '@/components/MobileNav';
import { MainNavItem } from '@/types';
import { Icons } from '@/components/Icons';

interface MainNavDashboardProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
}

export function MainNavDashboard({ items, children }: MainNavDashboardProps) {
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	return (
		<div className='flex gap-6 md:gap-10'>
			<Link href='/' className='items-center hidden space-x-2 md:flex'>
				<Icons.logo />
				<span className='hidden font-bold sm:inline-block'>
					{siteConfig.name}
				</span>
			</Link>
			<button
				className='flex items-center space-x-2 md:hidden'
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.menu />}
			</button>
			{showMobileMenu && items && (
				<MobileNav items={items}>{children}</MobileNav>
			)}
		</div>
	);
}
