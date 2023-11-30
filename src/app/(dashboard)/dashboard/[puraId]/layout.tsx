import { SidebarNav } from '@/components/SidebarNav';
import { dashboardConfig } from '@/config/dashboard';
interface DashboardLayoutProps {
	children?: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	return (
		<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
			<aside className='hidden w-[200px] flex-col md:flex'>
				<SidebarNav items={dashboardConfig.sidebarNav} />
			</aside>
			<main className='flex w-full flex-1 flex-col overflow-hidden'>
				{children}
			</main>
		</div>
	);
}
