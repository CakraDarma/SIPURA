import { db } from '@/lib/db';
import { z } from 'zod';

const routeContextSchema = z.object({
	params: z.object({
		puraId: z.string(),
	}),
});

export async function GET(
	req: Request,
	context: z.infer<typeof routeContextSchema>
) {
	try {
		const { params } = routeContextSchema.parse(context);

		let pelinggihPura = await db.pura.findFirst({
			where: { name: params.puraId },
			include: {
				pelinggihs: {
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		return new Response(JSON.stringify(pelinggihPura));
	} catch (e) {
		return new Response('Could not fetch kegiatan', { status: 500 });
	}
}
