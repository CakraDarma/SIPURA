import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserValidator } from '@/lib/validators/user';
import { Role } from '@prisma/client';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		userId: z.string(),
	}),
});

export async function PATCH(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const session = await getAuthSession();
		const { params } = routeContextSchema.parse(context);

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const { name, alamat, telepon, thumbnail } = UserValidator.parse(body);

		if (session.user.id !== params.userId && session.user.role !== 'ADMIN') {
			return new Response('Unauthorized', { status: 401 });
		}

		// update username
		await db.user.update({
			where: {
				id: params.userId,
			},
			data: {
				name,
				alamat,
				telepon,
				image: thumbnail,
			},
		});

		return new Response('OK');
	} catch (error) {
		error;

		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 400 });
		}

		return new Response(
			'Could not update username at this time. Please try later',
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

		const user = await db.user.findFirst({
			where: {
				id: params.userId,
			},
		});

		if (!user) {
			return new Response('User not found', { status: 403 });
		}

		if (session.user.role !== Role.ADMIN) {
			return new Response('Access Denied', { status: 401 });
		}

		await db.user.delete({
			where: {
				id: params.userId,
			},
		});
		return new Response('OK');
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 });
		}

		return new Response(
			'Could not delete User at this time. Please try again later.',
			{ status: 500 }
		);
	}
}
