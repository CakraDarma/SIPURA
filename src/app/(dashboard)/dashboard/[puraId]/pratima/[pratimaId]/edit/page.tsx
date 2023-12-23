import DashboardHeader from '@/components/DashboardHeader';
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
			userId: session.user.id,
		},
	});
	if (!pratima) {
		notFound();
	}

	return (
		<div className='container flex flex-col w-full h-full space-y-6'>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormEditPratima
				pratima={{
					nama: pratima.nama,
					konten: pratima.konten,
					puraId: pratima.puraId,
					jenis: pratima.jenis,
					bahan: pratima.bahan,
					id: pratima.id,
					tahunPeninggalan: pratima.tahunPeninggalan,
					thumbnail: pratima.thumbnail,
				}}
			/>
		</div>
	);
};

export default EditPratimaPage;
