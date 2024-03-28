import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { UpacaraValidator } from '@/lib/validators/upacara';

const routeContextSchema = z.object({
	params: z.object({
		upacaraId: z.string(),
	}),
});

export async function PATCH(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		const body = await req.json();

		const { nama, puraId, biaya, deskripsi, thumbnail, bantens } =
			UpacaraValidator.parse(body);
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

		if (!userRole && session.user.role !== 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.upacara.update({
			where: {
				id: params.upacaraId,
			},
			data: {
				nama,
				deskripsi,
				thumbnail,
				biaya,
				bantens,
				userId: session.user.id,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not change Upacara to the Pura at this time. Please try again later.',
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

		const pura = await db.upacara.findFirst({
			where: {
				id: params.upacaraId,
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

		if (!userRole && session.user.role !== 'ADMIN') {
			return new Response('Access Denied', { status: 403 });
		}

		await db.upacara.delete({
			where: {
				id: params.upacaraId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not delete Upacara to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
