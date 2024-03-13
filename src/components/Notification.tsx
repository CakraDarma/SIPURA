'use client';

import React from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { Icons } from './Icons';
import { Pura } from '@prisma/client';
import {
	Wuku,
	Filter,
	PancaWara,
	BalineseDateUtil,
	SaptaWara,
} from 'balinese-date-js-lib';
import {
	cn,
	findNearestDateObject,
	formatDate,
	getDaysDifference,
	isWithinSevenDaysBefore,
} from '@/lib/utils';

interface NotificationProps {
	puras: Pura[];
}

function Notification({ puras }: NotificationProps) {
	const piodalanPura = puras
		.map((pura) => {
			const currentYear = new Date().getFullYear();
			const start = new Date();
			const finish = new Date(currentYear + 1, 11, 31);
			const q = new Filter();

			q.saptaWara = SaptaWara[pura.saptaWara];
			q.pancaWara = PancaWara[pura.pancaWara];
			q.wuku = Wuku[pura.wuku];

			// get list piodalan
			const arr = BalineseDateUtil.filterByDateRange(start, finish, q);
			// @ts-ignore
			// get nearest piodalan
			const nextPiodalan = findNearestDateObject(arr);
			const daysDifference = getDaysDifference(nextPiodalan);

			if (isWithinSevenDaysBefore(nextPiodalan)) {
				return {
					...pura,
					nextPiodalan: nextPiodalan,
					daysPiodalan: daysDifference,
				};
			} else {
				return null;
			}
		})
		.filter((pura) => pura !== null);

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>
						<Icons.notif className='w-6 h-6' />
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid w-[250px] gap-3 p-4 md:w-[300px]'>
							<div className='pb-2 border-b-2 border-gray-500'>
								<h1 className='px-3 text-lg w-fit'>Notifikasi Piodalan</h1>
								<p className='px-3 text-sm text-gray-600 w-fit'>
									Piodalan 7 hari mendatang
								</p>
							</div>
							{piodalanPura.map((pura) => (
								<ListItem
									key={pura?.name}
									title={pura?.name}
									href={`${pura?.id}`}
								>
									Piodalan: {formatDate(pura?.nextPiodalan)}
								</ListItem>
								// <h1>adsfd</h1>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='text-sm leading-snug line-clamp-2 text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export default Notification;
