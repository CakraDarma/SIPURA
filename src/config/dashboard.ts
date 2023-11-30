import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Kabupaten',
			href: '/kabupaten',
		},
		{
			title: 'Kecamatan',
			href: '/kecamatan',
		},
		{
			title: 'Desa',
			href: '/desa',
		},
		{
			title: 'Pura',
			href: '/pura',
		},
	],
	dashboardNav: [
		{
			title: 'User',
			href: '#',
		},
		{
			title: 'Project',
			href: '#',
		},
	],
	sidebarNav: [
		{
			title: 'Profil',
			href: '/profil',
			icon: 'pura',
		},
		{
			title: 'Upacara',
			href: '/upacara',
			icon: 'upacara',
		},
		{
			title: 'Kegiatan',
			href: '/kegiatan',
			icon: 'kegiatan',
		},
		{
			title: 'Inventaris',
			href: '/inventaris',
			icon: 'inventory',
		},
		{
			title: 'Virtual Tour',
			href: '/virtual-tour',
			icon: 'virtualTour',
		},
		{
			title: 'Pengaturan',
			href: '/dashboard/settings',
			icon: 'settings',
		},
	],
};
