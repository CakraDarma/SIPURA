import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { VirtualTourValidator } from '@/lib/validators/virtualTour';

const routeContextSchema = z.object({
	params: z.object({
		virtualTourId: z.string(),
	}),
});

export async function PATCH(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		const body = await req.json();

		const { puraId, virtualTour, nama } = VirtualTourValidator.parse(body);
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const userRole = await db.userRole.findFirst({
			where: {
				puraId,
				userId: session.user.id,
			},
		});

		if (!userRole) {
			return new Response('Access Denied', { status: 403 });
		}

		await db.virtualTour.update({
			where: {
				id: params.virtualTourId,
			},
			data: {
				nama,
				virtualTour,
				userId: session.user.id,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not change Virtual Tour to the Pura at this time. Please try again later.',
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

		const pura = await db.virtualTour.findFirst({
			where: {
				id: params.virtualTourId,
			},
			select: {
				puraId: true,
			},
		});

		if (!pura) {
			return new Response('Pura not found', { status: 401 });
		}

		// verify user is prajuru to passed pura id
		const userRole = await db.userRole.findFirst({
			where: {
				puraId: pura.puraId,
				userId: session.user.id,
			},
		});

		if (!userRole) {
			return new Response('Access Denied', { status: 403 });
		}

		await db.virtualTour.delete({
			where: {
				id: params.virtualTourId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not deleteVirtualTour to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
