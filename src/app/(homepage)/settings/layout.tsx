import { SidebarNav } from '@/components/SidebarNav';
import { settingsConfig } from '@/config/settings';
import { authOptions, getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
interface DashboardLayoutProps {
	children?: React.ReactNode;
	params: {
		puraId: string;
	};
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	const session = await getAuthSession();
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	return (
		<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
			<aside className='hidden w-[200px] flex-col md:flex  mt-20'>
				<SidebarNav items={settingsConfig.sidebarNav} />
			</aside>
			<main className='flex flex-col flex-1 w-full overflow-hidden'>
				{children}
			</main>
		</div>
	);
}
