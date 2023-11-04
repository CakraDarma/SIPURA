import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'nav 1',
			href: '/docs',
		},
		{
			title: 'nav 2',
			href: '/support',
			disabled: true,
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
		{
			title: 'Pura',
			href: '/dashboard/settings',
			icon: 'settings',
		},
		{
			title: 'Verifikasi Pura Baru',
			href: '/dashboard/pura/verification',
			icon: 'settings',
		},
	],
};
