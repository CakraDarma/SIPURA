import { DashboardConfig } from '@/types';

export const settingsConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Profil',
			href: '/',
		},
		{
			title: 'Pemberitahuan',
			href: '/notification',
		},
	],
	sidebarNav: [
		{
			title: 'Profil',
			href: '/',
			icon: 'user',
		},
		{
			title: 'Notifikasi',
			href: '/notifications',
			icon: 'notif',
		},
	],
	dashboardNav: [
		{
			title: 'Profil',
			href: '/profil',
		},
		{
			title: 'Upacara',
			href: '/upacara',
		},
		{
			title: 'Kegiatan',
			href: '/kegiatan',
		},
		{
			title: 'Pelinggih',
			href: '/pelinggih',
		},
		{
			title: 'Pratima',
			href: '/pratima',
		},
		{
			title: 'Virtual Tour',
			href: '/virtual-tour',
		},
		{
			title: 'Akses Prajuru',
			href: '/prajuru',
		},
	],
};
