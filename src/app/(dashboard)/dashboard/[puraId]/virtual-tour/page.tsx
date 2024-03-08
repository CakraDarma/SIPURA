import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import TableVirtualTour from '@/components/table/TableVirtualTour';
import { buttonVariants } from '@/components/ui/Button';
import { db } from '@/lib/db';
import Link from 'next/link';

interface VirtualTourPageProps {
	params: {
		puraId: string;
	};
}

const VirtualTourPage = async ({ params }: VirtualTourPageProps) => {
	let data = await db.pura.findFirst({
		where: { id: params.puraId },
		include: {
			virtualTours: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	const virtualTourPura = data?.virtualTours.map(
		({ id, virtualTour, createdAt, nama }) => ({
			id,
			virtualTour,
			nama,
			createdAt,
		})
	);

	return (
		<>
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader
					heading='Virtual Tour Pura'
					text='Kelola Virtual Tour di dalam pura.'
				/>
				{virtualTourPura?.length ? (
					<div>
						<div className='flex flex-row justify-end'>
							<Link
								className={buttonVariants()}
								href={`/dashboard/${params.puraId}/virtual-tour/create`}
							>
								Tambah
							</Link>
						</div>
						<TableVirtualTour data={virtualTourPura} />
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>
							Belum ada virtual tour
						</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki virtual tour yang dimasukkan. Mulai tambahkan
							sekarang.
						</EmptyPlaceholder.Description>
						<Link
							className={buttonVariants({})}
							href={`/dashboard/${params.puraId}/virtual-tour/create`}
						>
							Tambah
						</Link>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</>
	);
};

export default VirtualTourPage;
