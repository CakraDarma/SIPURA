import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import TablePelinggih from '@/components/table/TablePelinggih';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface PelinggihPageProps {
	params: {
		puraId: string;
	};
}

const PelinggihPage = async ({ params }: PelinggihPageProps) => {
	let data = await db.pura.findFirst({
		where: { name: params.puraId },
		include: {
			pelinggihs: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const pelinggihPura = data?.pelinggihs.map(
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
				heading='Pelinggih Pura'
				text='Kelola pelinggih di dalam Pura.'
			/>
			<div className='flex flex-row justify-between'>
				<Link
					className={buttonVariants({
						variant: 'outline',
						className: 'w-60',
					})}
					href={`/dashboard/${params.puraId}/pelinggih/create`}
				>
					Tambahkan Kegiatan
				</Link>
			</div>
			<TablePelinggih data={pelinggihPura} />
		</DashboardShell>
	);
};

export default PelinggihPage;
