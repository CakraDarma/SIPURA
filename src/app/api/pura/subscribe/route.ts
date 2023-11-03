import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SubredditSubscriptionValidator } from '@/lib/validators/pura';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { puraId } = SubredditSubscriptionValidator.parse(body);

		// check if user has already subscribed to pura
		const subscriptionExists = await db.subscription.findFirst({
			where: {
				puraId,
				userId: session.user.id,
			},
		});

		if (subscriptionExists) {
			return new Response("You've already subscribed to this pura", {
				status: 400,
			});
		}

		// create pura and associate it with the user
		await db.subscription.create({
			data: {
				puraId,
				userId: session.user.id,
			},
		});

		return new Response(puraId);
	} catch (error) {
		error;
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not subscribe to pura at this time. Please try later',
			{ status: 500 }
		);
	}
}
