import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import FormEditPura from '@/components/form/FormEditPura';

interface PageProps {
	params: {
		puraId: string;
	};
}

const page = async ({ params }: PageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect('/sign-in');
	}
	const { puraId } = params;
	const pura = await db.pura.findFirst({
		where: {
			userId: session.user.id,
			id: puraId,
		},
	});

	if (!pura) return notFound();
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Profil Pura'
				text='Kelola informasi profil Pura.'
			/>
			<div>
				<FormEditPura pura={pura} />
			</div>
		</DashboardShell>
	);
};

export default page;
