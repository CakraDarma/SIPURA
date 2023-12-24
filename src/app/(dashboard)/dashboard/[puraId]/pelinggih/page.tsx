import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
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
		where: { id: params.puraId },
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
			{pelinggihPura?.length ? (
				<div>
					<div className='flex flex-row justify-end'>
						<Link
							className={buttonVariants()}
							href={`/dashboard/${params.puraId}/pelinggih/create`}
						>
							Tambah
						</Link>
					</div>
					<TablePelinggih data={pelinggihPura} />
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada pelinggih</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Anda belum memiliki pelinggih yang dimasukkan. Mulai tambahkan
						sekarang.
					</EmptyPlaceholder.Description>
					<Link
						className={buttonVariants({})}
						href={`/dashboard/${params.puraId}/pelinggih/create`}
					>
						Tambah
					</Link>
				</EmptyPlaceholder>
			)}
		</DashboardShell>
	);
};

export default PelinggihPage;
