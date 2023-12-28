import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PuraValidator } from '@/lib/validators/pura';
import { Role } from '@prisma/client';
import { z } from 'zod';

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
		const {
			alamat,
			kategori,
			name,
			piodalan,
			tahunBerdiri,
			konten,
			thumbnail,
			desaId,
		} = PuraValidator.parse(body);

		const session = await getAuthSession();

		console.log(session);

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}
		// verify user is ADMIN
		// @ts-ignore
		if (session.user.role !== Role.ADMIN) {
			const userRole = await db.userRole.findFirst({
				where: {
					puraId: params.puraId,
					userId: session.user.id,
				},
			});

			if (!userRole) {
				return new Response('Access Denied', { status: 403 });
			}
		}

		await db.pura.update({
			where: {
				id: params.puraId,
			},
			data: {
				name,
				alamat,
				kategori,
				piodalan,
				tahunBerdiri,
				konten,
				thumbnail,
				desaId,
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
			return new Response('Pura not found', { status: 403 });
		}

		// @ts-ignore
		if (session.user.role !== Role.ADMIN) {
			const userRole = await db.userRole.findFirst({
				where: {
					puraId: pura.id,
					userId: session.user.id,
				},
			});

			if (!userRole) {
				return new Response('Access Denied', { status: 403 });
			}
		}

		await db.pura.delete({
			where: {
				id: params.puraId as string,
			},
		});
		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 });
		}

		return new Response(
			'Could not delete Puraat this time. Please try again later.',
			{ status: 500 }
		);
	}
}
