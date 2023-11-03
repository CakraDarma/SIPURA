import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Documentation',
			href: '/docs',
		},
		{
			title: 'Support',
			href: '/support',
			disabled: true,
		},
	],
	sidebarNav: [
		{
			title: 'Posts',
			href: '/dashboard',
			icon: 'kegiatan',
		},
		{
			title: 'Billing',
			href: '/dashboard/billing',
			icon: 'billing',
		},
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: 'settings',
		},
	],
};
