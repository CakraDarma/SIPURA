'use client';

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { ExtendedPost } from '@/types/db';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Kegiatan from '@/components/Kegiatan';
import { useSession } from 'next-auth/react';

interface KegiatanFeedProps {
	initialKegiatans: ExtendedPost[];
	puraName?: string;
}

const KegiatanFeed = ({ initialKegiatans, puraName }: KegiatanFeedProps) => {
	const lastKegiatanRef = useRef<HTMLElement>(null);
	const { ref, entry } = useIntersection({
		root: lastKegiatanRef.current,
		threshold: 1,
	});
	const { data: session } = useSession();

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		['infinite-query'],
		async ({ pageParam = 1 }) => {
			const query =
				`/api/kegiatans?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
				(!!puraName ? `&puraName=${puraName}` : '');

			const { data } = await axios.get(query);
			return data as ExtendedPost[];
		},

		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialKegiatans], pageParams: [1] },
		}
	);

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage(); // Load more kegiatans when the last kegiatan comes into view
		}
	}, [entry, fetchNextPage]);

	const kegiatans = data?.pages.flatMap((page) => page) ?? initialKegiatans;

	return (
		<ul className='flex flex-col col-span-2 space-y-6'>
			{kegiatans.map((kegiatan, index) => {
				if (index === kegiatans.length - 1) {
					// Add a ref to the last kegiatan in the list
					return (
						<li key={kegiatan.id} ref={ref}>
							<Kegiatan kegiatan={kegiatan} puraName={kegiatan.pura.name} />
						</li>
					);
				} else {
					return (
						<Kegiatan
							key={kegiatan.id}
							kegiatan={kegiatan}
							puraName={kegiatan.pura.name}
						/>
					);
				}
			})}

			{isFetchingNextPage && (
				<li className='flex justify-center'>
					<Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
				</li>
			)}
		</ul>
	);
};

export default KegiatanFeed;
