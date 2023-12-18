import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PuraValidator } from '@/lib/validators/pura';
import { z } from 'zod';

export async function POST(req: Request) {
	try {
		const session = await getAuthSession();

		if (!session?.user) {
			return new Response('Unauthorized', { status: 401 });
		}

		const body = await req.json();
		const {
			name,
			alamat,
			kategori,
			piodalan,
			tahunBerdiri,
			konten,
			thumbnail,
		} = PuraValidator.parse(body);

		// check if pura already exists
		const puraExists = await db.pura.findFirst({
			where: {
				name,
			},
		});

		if (puraExists) {
			return new Response('Pura already exists', { status: 409 });
		}

		// create pura and associate it with the user
		const pura = await db.pura.create({
			data: {
				name,
				alamat,
				kategori,
				piodalan,
				tahunBerdiri,
				konten,
				thumbnail,
				userId: session.user.id,
			},
		});

		return new Response(pura.name);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(error.message, { status: 422 });
		}

		return new Response('Could not create pura', { status: 500 });
	}
}
