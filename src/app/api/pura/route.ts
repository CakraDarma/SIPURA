import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditValidator } from '@/lib/validators/pura';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();
		// console.log(session);

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { name } = SubredditValidator.parse(body);

		// check if subreddit already exists
		const subredditExists = await db.pura.findFirst({
			where: {
				name,
			},
		});

		if (subredditExists) {
			return new Response('Subreddit already exists', { status: 409 });
		}

		// create subreddit and associate it with the user
		const subreddit = await db.pura.create({
			data: {
				name,
				userId: session.user.id,
			},
		});

		// creator also has to be subscribed
		await db.userRole.create({
			data: {
				userId: session.user.id,
				puraId: subreddit.id,
			},
		});

		return new Response(subreddit.name);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 });
		}

		return new Response('Could not create subreddit', { status: 500 });
	}
}
