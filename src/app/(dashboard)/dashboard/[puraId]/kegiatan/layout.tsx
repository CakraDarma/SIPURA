import BackButton from '@/components/BackButton';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
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
	const pura = await db.pura.findFirst({
		where: { id: puraId },
		include: {
			kegiatans: {
				include: {
					user: true,
				},
			},
		},
	});

	if (!pura) return notFound();
	// const session = await getAuthSession();

	// const prajuruCount = await db.userRole.count({
	// 	where: {
	// 		pura: {
	// 			id: puraId,
	// 		},
	// 	},
	// });
	// const kegiatanCount = await db.kegiatan.count({
	// 	where: {
	// 		pura: {
	// 			id: puraId,
	// 		},
	// 	},
	// });

	return (
		<div className='h-full mx-auto sm:container max-w-7xl'>
			<div>
				<BackButton />
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4'>
					<div className='flex flex-col col-span-2 space-y-6'>{children}</div>

					{/* info sidebar */}
					{/* <div className='order-first overflow-hidden border border-gray-200 rounded-lg h-fit md:order-last'>
						<div className='px-6 py-4'>
							<p className='py-3 font-semibold'>Tentang Pura {pura.name}</p>
						</div>
						<dl className='px-6 py-4 text-sm leading-6 bg-white divide-y divide-gray-100'>
							<div className='flex justify-between py-3 gap-x-4'>
								<dt className='text-gray-500'>Dibuat</dt>
								<dd className='text-gray-700'>
									<time dateTime={pura.createdAt.toDateString()}>
										{formatDate(pura.createdAt)}
									</time>
								</dd>
							</div>
							<div className='flex justify-between py-3 gap-x-4'>
								<dt className='text-gray-500'>Jumlah prajuru</dt>
								<dd className='flex items-start gap-x-2'>
									<div className='text-gray-900'>{prajuruCount}</div>
								</dd>
							</div>
							<div className='flex justify-between py-3 gap-x-4'>
								<dt className='text-gray-500'>Jumlah kegiatan</dt>
								<dd className='flex items-start gap-x-2'>
									<div className='text-gray-900'>{kegiatanCount}</div>
								</dd>
							</div>
							{pura.userId === session?.user?.id ? (
								<div className='flex justify-between py-3 gap-x-4'>
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
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Layout;
