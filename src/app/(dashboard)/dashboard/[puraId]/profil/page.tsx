import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import FormEditPura from '@/components/FormEditPura';

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
			userId: session.user.id,
			name: puraId,
		},
	});

	console.log(pura);
	if (!pura) return notFound();
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Kegiatan Pura'
				text='Kelola kegiatan di dalam Pura.'
			/>
			<div>
				{pura ? (
					<div className='border divide-y rounded-md divide-border'>
						<FormEditPura pura={pura} />
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Belum ada postingan</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki postingan. Mulai membuat konten sekarang.
						</EmptyPlaceholder.Description>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/${puraId}/kegiatan/create`}
						>
							Tambah
						</Link>
					</EmptyPlaceholder>
				)}
			</div>
		</DashboardShell>
	);
};

export default page;
