import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TablePrajuru from '@/components/table/TablePrajuru';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface PrajuruPageProps {
	params: {
		puraId: string;
	};
}

const PrajuruPage = async ({ params }: PrajuruPageProps) => {
	let data = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			subscribers: {
				include: {
					user: true,
				},
			},
		},
	});

	const prajuruPura = data?.subscribers.map(({ user }) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		alamat: user.alamat,
		telepon: user.telepon,
	}));

	return (
		<DashboardShell>
			<DashboardHeader
				heading='Prajuru Pura'
				text='Kelola prajuru di dalam pura.'
			/>

			{prajuruPura?.length ? (
				<div className='overflow-x-auto '>
					<div className='flex flex-row justify-end'>
						<Link
							className={buttonVariants()}
							href={`/dashboard/${params.puraId}/prajuru/create`}
						>
							Tambah
						</Link>
					</div>
					<TablePrajuru data={prajuruPura} />
				</div>
			) : (
				<EmptyPlaceholder>
					<EmptyPlaceholder.Icon name='kegiatan' />
					<EmptyPlaceholder.Title>Belum ada prajuru</EmptyPlaceholder.Title>
					<EmptyPlaceholder.Description>
						Anda belum memiliki prajuru yang dimasukkan. Mulai tambahkan
						sekarang.
					</EmptyPlaceholder.Description>
					<Link
						className={buttonVariants({})}
						href={`/dashboard/${params.puraId}/prajuru/create`}
					>
						Tambah
					</Link>
				</EmptyPlaceholder>
			)}
		</DashboardShell>
	);
};

export default PrajuruPage;
