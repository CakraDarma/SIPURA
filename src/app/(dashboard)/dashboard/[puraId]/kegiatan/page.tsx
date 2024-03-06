import KegiatanItem from '@/components/KegiatanItem';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Pura, Kegiatan } from '@prisma/client';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

interface PageProps {
	params: {
		puraId: string;
	};
}

const page = async ({ params }: PageProps) => {
	const { puraId } = params;
	let pura: (Pura & { kegiatans: Kegiatan[] }) | null = null;
	pura = await db.pura.findFirst({
		where: { id: puraId },
		include: {
			kegiatans: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});
	if (!pura) return notFound();
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Kegiatan Pura'
				text='Kelola kegiatan di dalam pura.'
			/>
			<div>
				{pura?.kegiatans.length ? (
					<>
						<div className='border divide-y rounded-md divide-border'>
							{pura.kegiatans.map((kegiatan) => (
								<KegiatanItem key={kegiatan.id} kegiatan={kegiatan} />
							))}
						</div>
						<Link
							className={buttonVariants({
								variant: 'outline',
								className: 'w-full mt-12',
							})}
							href={`/dashboard/${puraId}/kegiatan/create`}
						>
							Tambahkan Kegiatan
						</Link>
					</>
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
