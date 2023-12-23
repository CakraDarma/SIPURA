import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
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
		where: { name: params.puraId },
		include: {
			pratimas: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const pratimaPura = data?.pratimas.map(
		({ id, tahunPeninggalan, thumbnail, createdAt, nama }) => ({
			id,
			nama,
			tahunPeninggalan,
			thumbnail,
			createdAt,
		})
	);
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Pratima Pura'
				text='Kelola pratima di dalam Pura.'
			/>
			<div className='flex flex-row justify-between'>
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-60',
					})}
					href={`/dashboard/${params.puraId}/pratima/create`}
				>
					Tambahkan Kegiatan
				</Link>
			</div>
			<TablePratima data={pratimaPura} />
		</DashboardShell>
	);
};

export default PratimaPage;
