import { notFound, redirect } from 'next/navigation';
import { Kegiatan } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { EditorEditKegiatan } from '@/components/form/EditorEditKegiatan';

async function getKegiatanForUser(kegiatanId: Kegiatan['id']) {
	return await db.kegiatan.findFirst({
		where: {
			id: kegiatanId,
		},
	});
}

interface EditorPageProps {
	params: { kegiatanId: string; puraId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
	const session = await getAuthSession();

	if (!session) {
		redirect(authOptions?.pages?.signIn || '/sign-in');
	}

	const kegiatan = await getKegiatanForUser(params.kegiatanId);
	if (!kegiatan) {
		notFound();
	}

	return (
		<div className='flex flex-col items-start gap-6'>
			{/* form */}
			<EditorEditKegiatan
				kegiatan={{
					id: kegiatan.id,
					title: kegiatan.title,
					content: kegiatan.content,
					puraId: kegiatan.puraId,
				}}
			/>
		</div>
	);
}
