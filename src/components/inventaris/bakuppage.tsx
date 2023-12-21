import KegiatanItem from '@/components/KegiatanItem';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

interface PageProps {
	params: {
		puraId: string;
	};
}

const page = async ({ params }: PageProps) => {
	const { puraId } = params;
	let pelinggihPura = await db.pura.findFirst({
		where: { name: puraId },
		include: {
			pelinggihs: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});
	if (!pelinggihPura) return notFound();
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Kegiatan Pura'
				text='Kelola kegiatan di dalam Pura.'
			/>
			<div>
				{pelinggihPura?.pelinggihs.length ? (
					<div className='border divide-y rounded-md divide-border'>
						{pelinggihPura.pelinggihs.map((pelinggih) => (
							<h1 key={pelinggih.id}>sdfa</h1>
							// <KegiatanItem key={kegiatan.id} kegiatan={kegiatan} />
						))}
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>
							Belum ada inventaris Pura
						</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki inventaris Pura. Mulai membuat inventaris
							sekarang.
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
