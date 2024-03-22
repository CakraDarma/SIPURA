import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TableBanten from '@/components/table/TableBanten';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface BantenPageProps {
	params: {
		puraId: string;
	};
}

const BantenPage = async ({ params }: BantenPageProps) => {
	let data = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			bantens: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const bantenPura = data?.bantens.map(
		({ id, thumbnail, createdAt, nama }) => ({
			id,
			nama,
			thumbnail,
			createdAt,
		})
	);
	return (
		<>
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader heading='Banten Pura' text='Kelola banten pura.' />
				{bantenPura?.length ? (
					<div>
						<div className='flex flex-row justify-end'>
							<Link
								className={buttonVariants()}
								href={`/dashboard/${params.puraId}/banten/create`}
							>
								Tambah
							</Link>
						</div>
						<TableBanten data={bantenPura} />
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>
							Belum ada data banten
						</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki data banten yang dimasukkan. Mulai tambahkan
							sekarang.
						</EmptyPlaceholder.Description>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/${params.puraId}/banten/create`}
						>
							Tambah
						</Link>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</>
	);
};

export default BantenPage;
