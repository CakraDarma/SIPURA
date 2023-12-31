import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserRolesValidator } from '@/lib/validators/prajuru';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		puraId: z.string(),
	}),
});

export async function POST(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { userId } = UserRolesValidator.parse(body);

		// check if user has already subscribed to pura
		const userRoleExists = await db.userRole.findFirst({
			where: {
				puraId: params.puraId,
				userId,
			},
		});

		if (userRoleExists) {
			return new Response("You've already prajuru to this pura", {
				status: 400,
			});
		}

		// create pura and associate it with the user
		await db.userRole.create({
			data: {
				puraId: params.puraId,
				userId,
			},
		});

		return new Response('Ok');
	} catch (error) {
		error;
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not make prajuru to this pura at this time. Please try later',
			{ status: 500 }
		);
	}
}
