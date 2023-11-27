import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import ToFeedButton from '@/components/ToFeedButton';
import { buttonVariants } from '@/components/ui/Button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Si Pura',
};

const Layout = async ({
	children,
	params: { puraId },
}: {
	children: ReactNode;
	params: { puraId: string };
}) => {
	const session = await getAuthSession();

	const pura = await db.pura.findFirst({
		where: { name: puraId },
		include: {
			kegiatans: {
				include: {
					author: true,
					votes: true,
				},
			},
		},
	});

	if (!pura) return notFound();

	const memberCount = await db.subscription.count({
		where: {
			pura: {
				name: puraId,
			},
		},
	});

	return (
		<div className='sm:container max-w-7xl mx-auto h-full'>
			<div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4'>
					<div className='flex flex-col col-span-2 space-y-6'>{children}</div>

					{/* info sidebar */}
					<div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
						<div className='px-6 py-4'>
							<p className='font-semibold py-3'>Tentang Pura {pura.name}</p>
						</div>
						<dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
							<div className='flex justify-between gap-x-4 py-3'>
								<dt className='text-gray-500'>Created</dt>
								<dd className='text-gray-700'>
									<time dateTime={pura.createdAt.toDateString()}>
										{format(pura.createdAt, 'MMMM d, yyyy')}
									</time>
								</dd>
							</div>
							<div className='flex justify-between gap-x-4 py-3'>
								<dt className='text-gray-500'>Prajuru</dt>
								<dd className='flex items-start gap-x-2'>
									<div className='text-gray-900'>{memberCount}</div>
								</dd>
							</div>
							{pura.creatorId === session?.user?.id ? (
								<div className='flex justify-between gap-x-4 py-3'>
									<dt className='text-gray-500'>
										Anda yang membuat objek Pura ini
									</dt>
								</div>
							) : null}

							<Link
								className={buttonVariants({
									variant: 'outline',
									className: 'w-full mb-6',
								})}
								href={`/dashboard/${puraId}/kegiatan/create`}
							>
								Tambahkan Kegiatan
							</Link>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
