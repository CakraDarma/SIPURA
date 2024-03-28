import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormEditUpacara from '@/components/form/FormEditUpacara';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface EditUpacaraPageProps {
	params: { upacaraId: string; puraId: string };
}

const EditUpacaraPage = async ({ params }: EditUpacaraPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const upacara = await db.upacara.findFirst({
		where: {
			id: params.upacaraId,
		},
	});
	if (!upacara) {
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
				<FormEditUpacara
					upacara={{
						nama: upacara.nama,
						bantens: upacara.bantens,
						deskripsi: upacara.deskripsi,
						puraId: upacara.puraId,
						id: upacara.id,
						biaya: upacara.biaya,
						thumbnail: upacara.thumbnail,
					}}
				/>
			</DashboardShell>
		</>
	);
};

export default EditUpacaraPage;
