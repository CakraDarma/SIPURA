import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormEditVirtualTour from '@/components/form/FormEditVirtualTour';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface EditVirtualTourPageProps {
	params: { virtualTourId: string; puraId: string };
}

const EditVirtualTourPage = async ({ params }: EditVirtualTourPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const virtualTour = await db.virtualTour.findFirst({
		where: {
			id: params.virtualTourId,
			userId: session.user.id,
		},
	});
	if (!virtualTour) {
		notFound();
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormEditVirtualTour
				virtualTour={{
					id: virtualTour.id,
					virtualTour: virtualTour.virtualTour,
					puraId: virtualTour.puraId,
				}}
			/>
		</DashboardShell>
	);
};

export default EditVirtualTourPage;
