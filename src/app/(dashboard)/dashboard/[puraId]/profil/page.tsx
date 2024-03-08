import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import FormEditPura from '@/components/form/FormEditPura';
import BackButton from '@/components/BackButton';

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
			id: puraId,
		},
	});
	const kecamatans = await db.kecamatan.findMany({
		include: {
			desas: true,
		},
	});

	if (!pura) return notFound();
	return (
		<>
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader
					heading='Profil Pura'
					text='Kelola informasi profil Pura.'
				/>
				<FormEditPura pura={pura} data={kecamatans} />
			</DashboardShell>
		</>
	);
};

export default page;
