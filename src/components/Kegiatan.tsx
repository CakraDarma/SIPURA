'use client';

import { formatTimeToNow } from '@/lib/utils';
import { Kegiatan, User } from '@prisma/client';
import { useRef } from 'react';
import EditorOutput from '@/components/EditorOutput';
import Link from 'next/link';

interface KegiatanProps {
	kegiatan: Kegiatan & {
		user: User;
	};
	puraName: string;
}

const Kegiatan = ({ kegiatan, puraName }: KegiatanProps) => {
	const pRef = useRef<HTMLParagraphElement>(null);

	return (
		<div className='bg-white rounded-md shadow'>
			<div className='flex justify-between px-6 py-4'>
				<div className='flex-1 w-0'>
					<div className='mt-1 text-xs text-gray-500 max-h-40'>
						{puraName ? (
							<>
								<a
									className='text-sm underline text-zinc-900 underline-offset-2'
									href={`/r/${puraName}`}
								>
									Pura {puraName}
								</a>
								<span className='px-1'>•</span>
							</>
						) : null}
						<span>Dikirim oleh {kegiatan.user.name}</span>{' '}
						{formatTimeToNow(new Date(kegiatan.createdAt))}
					</div>
					<a href={`/dashboard/${puraName}/kegiatan/${kegiatan.id}`}>
						<h1 className='py-2 text-lg font-semibold leading-6 text-gray-900'>
							{kegiatan.title}
						</h1>
					</a>

					<div
						className='relative w-full text-sm max-h-40 overflow-clip'
						ref={pRef}
					>
						<EditorOutput content={kegiatan.content} />
						{pRef.current?.clientHeight === 100 ? (
							// blur bottom if content is too long
							<div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent'></div>
						) : null}
					</div>
				</div>
			</div>
			<div className='z-20 px-4 py-4 text-sm bg-gray-50 sm:px-6'>
				<Link
					href={`/dashboard/${puraName}/kegiatan/${kegiatan.id}/edit`}
					className='flex items-center gap-2 w-fit'
				>
					Baca Selengkapnya
				</Link>
			</div>
		</div>
	);
};
export default Kegiatan;
