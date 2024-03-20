import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TableUpacara from '@/components/table/TableUpacara';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface UpacaraPageProps {
	params: {
		puraId: string;
	};
}

const UpacaraPage = async ({ params }: UpacaraPageProps) => {
	let data = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			upacaras: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const upacaraPura = data?.upacaras.map(
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
				<DashboardHeader heading='Upacara Pura' text='Kelola upacara pura.' />
				{upacaraPura?.length ? (
					<div>
						<div className='flex flex-row justify-end'>
							<Link
								className={buttonVariants()}
								href={`/dashboard/${params.puraId}/upacara/create`}
							>
								Tambah
							</Link>
						</div>
						<TableUpacara data={upacaraPura} />
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Belum ada upacara</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki upacara yang dimasukkan. Mulai tambahkan
							sekarang.
						</EmptyPlaceholder.Description>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/${params.puraId}/upacara/create`}
						>
							Tambah
						</Link>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</>
	);
};

export default UpacaraPage;
