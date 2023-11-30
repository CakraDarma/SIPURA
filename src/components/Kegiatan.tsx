'use client';

import { formatTimeToNow } from '@/lib/utils';
import { Kegiatan, User, Vote } from '@prisma/client';
import { useRef } from 'react';
import EditorOutput from './EditorOutput';
import Link from 'next/link';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
	kegiatan: Kegiatan & {
		user: User;
		votes: Vote[];
	};
	votesAmt: number;
	subredditName: string;
	currentVote?: PartialVote;
}

const Kegiatan = ({ kegiatan, subredditName }: PostProps) => {
	const pRef = useRef<HTMLParagraphElement>(null);

	return (
		<div className='rounded-md bg-white shadow'>
			<div className='px-6 py-4 flex justify-between'>
				<div className='w-0 flex-1'>
					<div className='max-h-40 mt-1 text-xs text-gray-500'>
						{subredditName ? (
							<>
								<a
									className='underline text-zinc-900 text-sm underline-offset-2'
									href={`/r/${subredditName}`}
								>
									Pura {subredditName}
								</a>
								<span className='px-1'>•</span>
							</>
						) : null}
						<span>Dikirim oleh {kegiatan.user.name}</span>{' '}
						{formatTimeToNow(new Date(kegiatan.createdAt))}
					</div>
					<a href={`/dashboard/${subredditName}/kegiatan/${kegiatan.id}`}>
						<h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>
							{kegiatan.title}
						</h1>
					</a>

					<div
						className='relative text-sm max-h-40 w-full overflow-clip'
						ref={pRef}
					>
						<EditorOutput content={kegiatan.content} />
						{pRef.current?.clientHeight === 160 ? (
							// blur bottom if content is too long
							<div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
						) : null}
					</div>
				</div>
			</div>
			<div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
				<Link
					href={`/dashboard/${subredditName}/kegiatan/${kegiatan.id}/edit`}
					className='w-fit flex items-center gap-2'
				>
					Baca Selengkapnya
				</Link>
			</div>
		</div>
	);
};
export default Kegiatan;
