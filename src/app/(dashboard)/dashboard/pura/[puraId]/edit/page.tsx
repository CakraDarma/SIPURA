import { notFound, redirect } from 'next/navigation';
import { Pura } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import FormEditPura from '@/components/form/FormEditPura';

async function getPuraForUser(puraId: Pura['id']) {
	return await db.pura.findFirst({
		where: {
			id: puraId,
		},
	});
}

interface EditorPageProps {
	params: { puraId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const pura = await getPuraForUser(params.puraId);
	const kecamatans = await db.kecamatan.findMany({
		include: {
			desas: true,
		},
	});
	if (!pura) {
		notFound();
	}

	return (
		<div className='max-w-4xl mx-auto'>
			<div className='grid items-start gap-8'>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
				/>
				<FormEditPura pura={pura} data={kecamatans} />
			</div>
		</div>
	);
}
