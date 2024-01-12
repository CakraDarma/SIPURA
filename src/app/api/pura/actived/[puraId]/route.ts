import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { ActivedPuraValidator } from '@/lib/validators/pura';

const routeContextSchema = z.object({
	params: z.object({
		puraId: z.string(),
	}),
});

export async function PATCH(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		const body = await req.json();

		const { actived } = ActivedPuraValidator.parse(body);
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		if (session.user.role != 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.pura.update({
			where: {
				id: params.puraId,
			},
			data: {
				actived,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not change Pura to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const pura = await db.pura.findFirst({
			where: {
				id: params.puraId,
			},
		});

		if (!pura) {
			return new Response('Pura not found', { status: 401 });
		}

		if (session.user.role != 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.pura.delete({
			where: {
				id: params.puraId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not delete Pura to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
