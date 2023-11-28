import Link from 'next/link';
import { Kegiatan } from '@prisma/client';

import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import KegiatanOperations from '@/components/KegiatanOperations';

interface KegiatanItemProps {
	kegiatan: Pick<Kegiatan, 'id' | 'title' | 'createdAt'>;
}

export default function KegiatanItem({ kegiatan }: KegiatanItemProps) {
	return (
		<div className='flex items-center justify-between p-4'>
			<div className='grid gap-1'>
				<Link
					href={`/editor/${kegiatan.id}`}
					className='font-semibold hover:underline'
				>
					{kegiatan.title}
				</Link>
				<div>
					<p className='text-sm text-muted-foreground'>
						{formatDate(kegiatan.createdAt?.toDateString())}
					</p>
				</div>
			</div>
			<KegiatanOperations
				kegiatan={{ id: kegiatan.id, title: kegiatan.title }}
			/>
		</div>
	);
}

KegiatanItem.Skeleton = function KegiatanItemSkeleton() {
	return (
		<div className='p-4'>
			<div className='space-y-3'>
				<Skeleton className='h-5 w-2/5' />
				<Skeleton className='h-4 w-4/5' />
			</div>
		</div>
	);
};
