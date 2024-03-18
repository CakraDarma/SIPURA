'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { Icons } from '@/components/Icons';

interface SidebarNavProps {
	items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
	const path = usePathname();
	const params = useParams();

	if (!items?.length) {
		return null;
	}

	return (
		<nav className='grid items-start gap-2'>
			{items.map((item, index) => {
				const Icon = Icons[item.icon || 'arrowRight'];
				return (
					item.href && (
						<Link
							key={index}
							href={
								params.puraId
									? `/dashboard/${params.puraId + item.href}`
									: `/settings/${item.href}`
							}
						>
							<span
								className={cn(
									'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
									path.includes(`/dashboard/${params.puraId + item.href}`)
										? 'bg-accent'
										: 'transparent',
									item.disabled && 'cursor-not-allowed opacity-80'
								)}
							>
								<Icon className='w-4 h-4 mr-2' />
								<span>{item.title}</span>
							</span>
						</Link>
					)
				);
			})}
		</nav>
	);
}
