'use client';

import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

interface NotificationProps {
	hide?: boolean;
}

interface NotifikasiPiodalan {
	ids: string[];
	reminder: number;
}

function Notification({ hide }: NotificationProps) {
	const [notificationData, setNotificationData] = useState<Pura[]>([]);
	const [reminder, setReminder] = useState<number>();
	const [showFollowed, setShowFollowed] = useState(true);

	useEffect(() => {
		const fetchNotificationData = async () => {
			try {
				const piodalanNotification = localStorage.getItem(
					'piodalanNotifications'
				);
				const notifikasi: NotifikasiPiodalan = piodalanNotification
					? JSON.parse(piodalanNotification)
					: [];
				const { ids } = notifikasi;
				if (ids.length > 0) {
					const endpoint = showFollowed
						? '/api/notification'
						: '/api/notification/prajuru';
					const requestData = showFollowed ? { puraIds: ids } : null;
					const response = await axios.post(endpoint, requestData);
					setReminder(notifikasi.reminder);
					setNotificationData(response.data);
				}
			} catch (error) {
				console.error('Error fetching notification data:', error);
			}
		};

		fetchNotificationData();
	}, [showFollowed]);

	const piodalanPura = notificationData
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
			const nextPiodalan = findNearestDateObject(arr);
			const daysDifference = getDaysDifference(nextPiodalan);

			if (isWithinSevenDaysBefore(nextPiodalan, reminder)) {
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
						<div className='flex flex-row justify-between px-4 py-2 md:w-[300px]'>
							<button
								onClick={() => setShowFollowed(true)}
								className={`focus:outline-none ${
									showFollowed
										? 'font-bold border-b-2 border-orange-light text-orange-light'
										: ''
								}`}
							>
								Pura Diikuti
							</button>

							{!hide && (
								<button
									onClick={() => setShowFollowed(false)}
									className={`focus:outline-none ${
										!showFollowed
											? 'font-bold border-b-2 border-orange-light text-orange-light'
											: ''
									}`}
								>
									Pura Disungsung
								</button>
							)}
						</div>
						<ul className='grid w-[250px] gap-3 p-4 md:w-[300px]'>
							<div className='pb-2 border-b-2 border-gray-500'>
								<h1 className='px-3 text-lg w-fit'>Notifikasi Piodalan</h1>
								<p className='px-3 text-sm text-gray-600 w-fit'>
									{`Piodalan ${reminder}  hari mendatang`}
								</p>
							</div>
							{piodalanPura && piodalanPura.length > 0 ? (
								piodalanPura.map((pura) => (
									<ListItem
										key={pura?.name}
										title={pura?.name}
										href={`${pura?.id}`}
									>
										Piodalan: {formatDate(pura?.nextPiodalan)}
									</ListItem>
								))
							) : (
								<h3 className='px-3 text-sm text-gray-700 w-fit'>
									Tidak ada piodalan pura terdekat
								</h3>
							)}
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
