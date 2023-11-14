'use client';

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { ExtendedPost } from '@/types/db';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Kegiatan from './Kegiatan';
import { useSession } from 'next-auth/react';

interface PostFeedProps {
	initialPosts: ExtendedPost[];
	subredditName?: string;
}

const PostFeed = ({ initialPosts, subredditName }: PostFeedProps) => {
	const lastPostRef = useRef<HTMLElement>(null);
	const { ref, entry } = useIntersection({
		root: lastPostRef.current,
		threshold: 1,
	});
	const { data: session } = useSession();

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		['infinite-query'],
		async ({ pageParam = 1 }) => {
			const query =
				`/api/kegiatans?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
				(!!subredditName ? `&subredditName=${subredditName}` : '');

			const { data } = await axios.get(query);
			return data as ExtendedPost[];
		},

		{
			getNextPageParam: (_, pages) => {
				return pages.length + 1;
			},
			initialData: { pages: [initialPosts], pageParams: [1] },
		}
	);

	useEffect(() => {
		if (entry?.isIntersecting) {
			fetchNextPage(); // Load more kegiatans when the last kegiatan comes into view
		}
	}, [entry, fetchNextPage]);

	const kegiatans = data?.pages.flatMap((page) => page) ?? initialPosts;

	return (
		<ul className='flex flex-col col-span-2 space-y-6'>
			{kegiatans.map((kegiatan, index) => {
				const votesAmt = kegiatan.votes.reduce((acc, vote) => {
					if (vote.type === 'UP') return acc + 1;
					if (vote.type === 'DOWN') return acc - 1;
					return acc;
				}, 0);

				const currentVote = kegiatan.votes.find(
					(vote) => vote.userId === session?.user.id
				);

				if (index === kegiatans.length - 1) {
					// Add a ref to the last kegiatan in the list
					return (
						<li key={kegiatan.id} ref={ref}>
							<Kegiatan
								kegiatan={kegiatan}
								subredditName={kegiatan.pura.name}
								votesAmt={votesAmt}
								currentVote={currentVote}
							/>
						</li>
					);
				} else {
					return (
						<Kegiatan
							key={kegiatan.id}
							kegiatan={kegiatan}
							subredditName={kegiatan.pura.name}
							votesAmt={votesAmt}
							currentVote={currentVote}
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

export default PostFeed;
