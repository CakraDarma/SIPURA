'use client';

import Link from 'next/link';
import { Kegiatan, Pura } from '@prisma/client';

import { Skeleton } from '@/components/ui/skeleton';
import KegiatanOperations from '@/components/operations/KegiatanOperations';
import { formatDate, formatTimeToNow } from '@/lib/utils';
import EditorOutput from './EditorOutput';
import { useRef } from 'react';

interface KegiatanItemProps {
	kegiatan: Kegiatan;
	pura: Pura;
	userName: string | null;
}

export default function KegiatanList({
	kegiatan,
	pura,
	userName,
}: KegiatanItemProps) {
	const pRef = useRef<HTMLParagraphElement>(null);
	return (
		<div className='border divide-y rounded-md divide-border'>
			<div className='container py-2 max-w-7xl'>
				<div className='flex items-center justify-between p-4'>
					<div className='grid gap-1'>
						<div className='flex flex-row justify-between mt-1 text-xs text-gray-500 max-h-40'>
							<div>
								<Link
									className='text-sm underline text-zinc-900 underline-offset-2'
									href={`/pura/${pura.id}`}
								>
									{pura.name}
								</Link>
								<span className='px-1'>•</span>
								<span>Dikirim oleh {userName}</span>{' '}
								{formatTimeToNow(new Date(kegiatan.createdAt))}
							</div>
							<KegiatanOperations
								kegiatan={{ id: kegiatan.id, title: kegiatan.title }}
							/>
						</div>
						<h2 className='font-semibold '>{kegiatan.title}</h2>
						<div>
							<time
								dateTime={kegiatan.createdAt.toDateString()}
								className='text-sm text-muted-foreground'
							>
								{formatDate(kegiatan.createdAt)}
							</time>
						</div>
						<div
							className='relative w-full text-sm max-h-28 overflow-clip'
							ref={pRef}
						>
							<EditorOutput content={kegiatan.content} />
							{pRef.current?.clientHeight == 112 ? (
								// blur bottom if content is too long
								<div className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent'>
									{' '}
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
			<div className='z-20 px-4 py-4 text-sm bg-gray-50 sm:px-6'>
				<Link
					href={`/pura/${pura.id}/kegiatan/${kegiatan.id}`}
					className='flex items-center gap-2 w-fit'
				>
					Baca Selengkapnya
				</Link>
			</div>
		</div>
	);
}

KegiatanList.Skeleton = function KegiatanItemSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='w-2/5 h-5' />
				<Skeleton className='w-4/5 h-4' />
			</div>
		</div>
	);
};
