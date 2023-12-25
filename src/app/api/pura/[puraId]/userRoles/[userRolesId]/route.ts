import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		userRolesId: z.string(),
		puraId: z.string(),
	}),
});

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

		const pura = await db.userRole.findFirst({
			where: {
				userId: params.userRolesId,
				puraId: params.puraId,
			},
			select: {
				puraId: true,
			},
		});

		if (!pura) {
			return new Response('User not found', { status: 401 });
		}

		await db.userRole.deleteMany({
			where: {
				userId: {
					equals: params.userRolesId,
				},
				puraId: {
					equals: params.puraId,
				},
			},
		});

		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not delete Kegiatan to the Pura at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
