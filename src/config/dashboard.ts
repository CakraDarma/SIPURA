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
			href: '/dashboard/profil',
			icon: 'pura',
		},
		{
			title: 'Upacara',
			href: '/dashboard/upacara',
			icon: 'upacara',
		},
		{
			title: 'Kegiatan',
			href: '/dashboard/test/kegiatan',
			icon: 'kegiatan',
		},
		{
			title: 'Inventaris',
			href: '/dashboard/inventaris',
			icon: 'inventory',
		},
		{
			title: 'Virtual Tour',
			href: '/dashboard/virtual-tour',
			icon: 'virtualTour',
		},
		{
			title: 'Pengaturan',
			href: '/dashboard/settings',
			icon: 'settings',
		},
	],
};
