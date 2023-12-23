import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import TableInventaris from '@/components/TableInventaris';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface InventarisPageProps {
	params: {
		puraId: string;
	};
}

const InventarisPage = async ({ params }: InventarisPageProps) => {
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
				heading='Inventaris Pura'
				text='Kelola inventaris di dalam Pura.'
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
			<TableInventaris data={pratimaPura} />
		</DashboardShell>
	);
};

export default InventarisPage;
