import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormCreateUpacara from '@/components/form/FormCreateUpacara';
import { db } from '@/lib/db';
import { Banten, Pura } from '@prisma/client';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		puraId: string;
	};
}

const Page = async ({ params }: PageProps) => {
	const { puraId } = params;
	let pura: (Pura & { bantens: Banten[] }) | null = null;
	pura = await db.pura.findFirst({
		where: { id: puraId },
		include: {
			bantens: {
				orderBy: {
					createdAt: 'desc',
				},
			},
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
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
				/>
				<hr className='h-px bg-red-500' />
				<FormCreateUpacara dataBanten={pura.bantens} />
			</DashboardShell>
		</>
	);
};

export default Page;
