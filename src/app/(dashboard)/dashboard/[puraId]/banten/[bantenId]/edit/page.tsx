import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormEditBanten from '@/components/form/FormEditBanten';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface EditBantenPageProps {
	params: { bantenId: string; puraId: string };
}

const EditBantenPage = async ({ params }: EditBantenPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const banten = await db.banten.findFirst({
		where: {
			id: params.bantenId,
		},
	});
	if (!banten) {
		notFound();
	}

	return (
		<>
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
				/>
				<hr className='h-px bg-red-500' />
				<FormEditBanten
					banten={{
						nama: banten.nama,
						deskripsi: banten.deskripsi,
						komponen: banten.komponen,
						puraId: banten.puraId,
						id: banten.id,
						kategori: banten.kategori,
						thumbnail: banten.thumbnail,
					}}
				/>
			</DashboardShell>
		</>
	);
};

export default EditBantenPage;
