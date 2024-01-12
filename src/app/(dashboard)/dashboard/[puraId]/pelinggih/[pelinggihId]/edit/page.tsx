import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormEditPelinggih from '@/components/form/FormEditPelinggih';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface EditPelinggihPageProps {
	params: { pelinggihId: string; puraId: string };
}

const EditPelinggihPage = async ({ params }: EditPelinggihPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const pelinggih = await db.pelinggih.findFirst({
		where: {
			id: params.pelinggihId,
		},
	});
	if (!pelinggih) {
		notFound();
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormEditPelinggih
				pelinggih={{
					nama: pelinggih.nama,
					konten: pelinggih.konten,
					puraId: pelinggih.puraId,
					id: pelinggih.id,
					tahunPeninggalan: pelinggih.tahunPeninggalan,
					thumbnail: pelinggih.thumbnail,
				}}
			/>
		</DashboardShell>
	);
};

export default EditPelinggihPage;
