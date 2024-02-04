import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TablePratima from '@/components/table/TablePratima';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface PratimaPageProps {
	params: {
		puraId: string;
	};
}

const PratimaPage = async ({ params }: PratimaPageProps) => {
	let data = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			pratimas: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const pratimaPura = data?.pratimas.map(
		({ id, tahunDitemukan, thumbnail, createdAt, nama }) => ({
			id,
			nama,
			tahunDitemukan,
			thumbnail,
			createdAt,
		})
	);
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Pratima Pura'
				text='Kelola pratima di dalam pura.'
			/>
			{pratimaPura?.length ? (
				<div>
					<div className='flex flex-row justify-end'>
						<Link
							className={buttonVariants()}
							href={`/dashboard/${params.puraId}/pratima/create`}
						>
							Tambah
						</Link>
					</div>
					<TablePratima data={pratimaPura} />
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada pratima</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Anda belum memiliki pratima yang dimasukkan. Mulai tambahkan
						sekarang.
					</EmptyPlaceholder.Description>
					<Link
						className={buttonVariants({})}
						href={`/dashboard/${params.puraId}/pratima/create`}
					>
						Tambah
					</Link>
				</EmptyPlaceholder>
			)}
		</DashboardShell>
	);
};

export default PratimaPage;
