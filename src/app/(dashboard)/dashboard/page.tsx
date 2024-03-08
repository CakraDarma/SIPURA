import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import CardPuras from '@/components/CardPuras';

export const metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const session = await getAuthSession();

	if (!session) {
		redirect('/sign-in');
	}

	let pura;
	if (session.user.role == 'ADMIN') {
		pura = await db.pura.findMany({
			where: {
				actived: true,
			},
		});
	} else {
		pura = await db.pura.findMany({
			where: {
				subscribers: {
					some: {
						userId: {
							equals: session.user.id,
						},
					},
				},
				actived: true,
			},
		});
	}

	const puraNotActived = await db.pura.findMany({
		where: { actived: false, userId: session.user.id },
	});

	const countPuraIsUnactived = puraNotActived.length;

	return (
		<div className='container flex flex-col h-full space-y-6 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang
						nyaman.'
				/>
				{pura?.length ? (
					<div>
						<div className='flex flex-row gap-2'>
							<Link
								className={buttonVariants({})}
								href={`/dashboard/pura/create`}
							>
								Tambah
							</Link>
							<Link
								href={'/dashboard/pura/pending'}
								className={buttonVariants({})}
							>
								<div className='flex flex-row justify-between w-full gap-3'>
									<p className='text-sm text-white '>Pending</p>
									{countPuraIsUnactived > 0 && (
										<div className='flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full '>
											<p className='text-[9px] text-white'>
												{countPuraIsUnactived}
											</p>
										</div>
									)}
								</div>
							</Link>
						</div>
						<div className='flex flex-col flex-wrap items-center justify-start gap-6 mb-10 md:flex-row'>
							{pura.map((pura, index) => (
								<CardPuras
									key={index}
									pura={pura}
									link={`dashboard/${pura.id}`}
								/>
							))}
						</div>
					</div>
				) : (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name='kegiatan' />
						<EmptyPlaceholder.Title>Tidak ada pura</EmptyPlaceholder.Title>
						<EmptyPlaceholder.Description>
							Anda belum memiliki pura yang tersedia. Silahkan tambahkan pura
							terlebih dahulu
						</EmptyPlaceholder.Description>
						<div className='flex flex-row gap-2'>
							<Link
								className={buttonVariants({})}
								href={`/dashboard/pura/create`}
							>
								Tambah
							</Link>
							{countPuraIsUnactived > 0 && (
								<Link
									href={'/dashboard/pura/pending'}
									className={buttonVariants({})}
								>
									<div className='flex flex-row justify-between w-full gap-3'>
										<p className='text-sm text-white '>Pending</p>
										{countPuraIsUnactived > 0 && (
											<div className='flex items-center justify-center w-5 h-5 text-white bg-red-500 rounded-full '>
												<p className='text-[9px] text-white'>
													{countPuraIsUnactived}
												</p>
											</div>
										)}
									</div>
								</Link>
							)}
						</div>
					</EmptyPlaceholder>
				)}
			</DashboardShell>
		</div>
	);
}
