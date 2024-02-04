import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormEditPratima from '@/components/form/FormEditPratima';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface EditPratimaPageProps {
	params: { pratimaId: string; puraId: string };
}

const EditPratimaPage = async ({ params }: EditPratimaPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const pratima = await db.pratima.findFirst({
		where: {
			id: params.pratimaId,
		},
	});
	if (!pratima) {
		notFound();
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormEditPratima
				pratima={{
					nama: pratima.nama,
					konten: pratima.konten,
					puraId: pratima.puraId,
					id: pratima.id,
					tahunDitemukan: pratima.tahunDitemukan,
					thumbnail: pratima.thumbnail,
				}}
			/>
		</DashboardShell>
	);
};

export default EditPratimaPage;
