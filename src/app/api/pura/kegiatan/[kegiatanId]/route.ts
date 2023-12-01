import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { kegiatanValidator } from '@/lib/validators/kegiatan';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		kegiatanId: z.string(),
	}),
});

export async function PATCH(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		const body = await req.json();

		const { title, content, puraId } = kegiatanValidator.parse(body);

		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		// verify user is subscribed to passed pura id
		const userRole = await db.userRole.findFirst({
			where: {
				puraId,
				userId: session.user.id,
			},
		});

		if (!userRole) {
			return new Response('Subscribe to kegiatan', { status: 403 });
		}

		await db.kegiatan.update({
			where: {
				id: params.kegiatanId,
			},
			data: {
				title,
				content,
				userId: session.user.id,
				puraId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not kegiatan to pura at this time. Please try later',
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

		console.log(params);

		await db.kegiatan.delete({
			where: {
				id: params.kegiatanId,
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not kegiatan to pura at this time. Please try later',
			{ status: 500 }
		);
	}
}
