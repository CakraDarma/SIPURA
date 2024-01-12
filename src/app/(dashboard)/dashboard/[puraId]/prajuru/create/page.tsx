import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormAddRoles from '@/components/form/FormAddRoles';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

interface AddPrajuruPageProps {
	params: { PrajuruId: string; puraId: string };
}

const AddPrajuruPage = async ({ params }: AddPrajuruPageProps) => {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const usersWithoutRolesForPura: User[] =
		await db.$queryRaw`SELECT * FROM User WHERE id NOT IN (SELECT userId FROM UserRole WHERE puraId = ${params.puraId})`;

	if (!usersWithoutRolesForPura) {
		notFound();
	}

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormAddRoles prajuru={usersWithoutRolesForPura} puraId={params.puraId} />
		</DashboardShell>
	);
};

export default AddPrajuruPage;
