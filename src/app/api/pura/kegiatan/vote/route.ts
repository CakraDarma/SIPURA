import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';
import { PostVoteValidator } from '@/lib/validators/vote';
import { CachedPost } from '@/types/redis';
import { z } from 'zod';

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
	try {
		const body = await req.json();

		const { kegiatanId, voteType } = PostVoteValidator.parse(body);

		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		// check if user has already voted on this kegiatan
		const existingVote = await db.vote.findFirst({
			where: {
				userId: session.user.id,
				kegiatanId,
			},
		});

		const kegiatan = await db.kegiatan.findUnique({
			where: {
				id: kegiatanId,
			},
			include: {
				author: true,
				votes: true,
			},
		});

		if (!kegiatan) {
			return new Response('Kegiatan not found', { status: 404 });
		}

		if (existingVote) {
			// if vote type is the same as existing vote, delete the vote
			if (existingVote.type === voteType) {
				await db.vote.delete({
					where: {
						userId_kegiatanId: {
							kegiatanId,
							userId: session.user.id,
						},
					},
				});

				// Recount the votes
				const votesAmt = kegiatan.votes.reduce((acc, vote) => {
					if (vote.type === 'UP') return acc + 1;
					if (vote.type === 'DOWN') return acc - 1;
					return acc;
				}, 0);

				if (votesAmt >= CACHE_AFTER_UPVOTES) {
					const cachePayload: CachedPost = {
						authorUsername: kegiatan.author.username ?? '',
						content: JSON.stringify(kegiatan.content),
						id: kegiatan.id,
						title: kegiatan.title,
						currentVote: null,
						createdAt: kegiatan.createdAt,
					};

					await redis.hset(`kegiatan:${kegiatanId}`, cachePayload); // Store the kegiatan data as a hash
				}

				return new Response('OK');
			}

			// if vote type is different, update the vote
			await db.vote.update({
				where: {
					userId_kegiatanId: {
						kegiatanId,
						userId: session.user.id,
					},
				},
				data: {
					type: voteType,
				},
			});

			// Recount the votes
			const votesAmt = kegiatan.votes.reduce((acc, vote) => {
				if (vote.type === 'UP') return acc + 1;
				if (vote.type === 'DOWN') return acc - 1;
				return acc;
			}, 0);

			if (votesAmt >= CACHE_AFTER_UPVOTES) {
				const cachePayload: CachedPost = {
					authorUsername: kegiatan.author.username ?? '',
					content: JSON.stringify(kegiatan.content),
					id: kegiatan.id,
					title: kegiatan.title,
					currentVote: voteType,
					createdAt: kegiatan.createdAt,
				};

				await redis.hset(`kegiatan:${kegiatanId}`, cachePayload); // Store the kegiatan data as a hash
			}

			return new Response('OK');
		}

		// if no existing vote, create a new vote
		await db.vote.create({
			data: {
				type: voteType,
				userId: session.user.id,
				kegiatanId,
			},
		});

		// Recount the votes
		const votesAmt = kegiatan.votes.reduce((acc, vote) => {
			if (vote.type === 'UP') return acc + 1;
			if (vote.type === 'DOWN') return acc - 1;
			return acc;
		}, 0);

		if (votesAmt >= CACHE_AFTER_UPVOTES) {
			const cachePayload: CachedPost = {
				authorUsername: kegiatan.author.username ?? '',
				content: JSON.stringify(kegiatan.content),
				id: kegiatan.id,
				title: kegiatan.title,
				currentVote: voteType,
				createdAt: kegiatan.createdAt,
			};

			await redis.hset(`kegiatan:${kegiatanId}`, cachePayload); // Store the kegiatan data as a hash
		}

		return new Response('OK');
	} catch (error) {
		error;
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not kegiatan to pura at this time. Please try later',
			{ status: 500 }
		);
	}
}
