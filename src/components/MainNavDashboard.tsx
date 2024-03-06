'use client';

import * as React from 'react';
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
		<div className='flex gap-6 md:hidden md:gap-10'>
			<button
				className='flex items-center space-x-2 '
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu ? <Icons.close /> : <Icons.menu />}
			</button>
			{showMobileMenu && items && (
				<MobileNav setShowMobileMenu={setShowMobileMenu} items={items}>
					{children}
				</MobileNav>
			)}
		</div>
	);
}
