import { SidebarNav } from '@/components/SidebarNav';
import { dashboardConfig } from '@/config/dashboard';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
interface DashboardLayoutProps {
	children?: React.ReactNode;
	params: {
		puraId: string;
	};
}

export default async function DashboardLayout({
	children,
	params,
}: DashboardLayoutProps) {
	const session = await getAuthSession();
	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const statusPura = await db.pura.findFirst({
		where: {
			id: params.puraId,
		},
		select: {
			actived: true,
		},
	});
	const accessPage = await db.userRole.findFirst({
		where: {
			userId: session.user.id,
			pura: {
				id: params.puraId,
			},
		},
	});

	if (
		statusPura?.actived != true ||
		(!accessPage && session.user.role != 'ADMIN')
	) {
		redirect('/dashboard');
	}

	return (
		<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
			<aside className='hidden w-[200px] flex-col md:flex'>
				<SidebarNav items={dashboardConfig.sidebarNav} />
			</aside>
			<main className='flex flex-col flex-1 w-full overflow-hidden'>
				{children}
			</main>
		</div>
	);
}
