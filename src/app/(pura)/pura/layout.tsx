import Hero from '@/components/Hero';
import PuraNav from '@/components/PuraNav';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

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
	const pura = await db.pura.findFirst({
		where: {
			id: params.puraId,
		},
	});
	if (!pura) {
		redirect('/');
	}
	return (
		<>
			<Hero
				imageUrl={pura?.thumbnail}
				heading={pura?.name}
				text='Temukan Informasi Pura'
			/>
			<PuraNav />
			{children}
		</>
	);
}
