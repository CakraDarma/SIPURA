import { notFound, redirect } from 'next/navigation';
import { Kegiatan, User } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { EditorEditKegiatan } from '@/components/form/EditorEditKegiatan';
import { Button } from '@/components/ui/Button';

async function getKegiatanForUser(
	kegiatanId: Kegiatan['id'],
	userId: User['id']
) {
	return await db.kegiatan.findFirst({
		where: {
			id: kegiatanId,
			userId: userId,
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

	const kegiatan = await getKegiatanForUser(params.kegiatanId, session.user.id);
	if (!kegiatan) {
		notFound();
	}

	return (
		<div className='flex flex-col items-start gap-6'>
			{/* heading */}
			<div className='pb-5 border-b border-gray-200'>
				<div className='flex flex-wrap items-baseline -mt-2 -ml-2'>
					<h3 className='mt-2 ml-2 text-base font-semibold leading-6 text-gray-900'>
						Buat postingan
					</h3>
					<p className='mt-1 ml-2 text-sm text-gray-500 truncate'>
						di {params.puraId}
					</p>
				</div>
			</div>

			{/* form */}
			<EditorEditKegiatan
				kegiatan={{
					id: kegiatan.id,
					title: kegiatan.title,
					content: kegiatan.content,
					puraId: kegiatan.puraId,
				}}
			/>

			<div className='flex justify-end w-full'>
				<Button type='submit' className='w-full' form='pura-kegiatan-form'>
					Kegiatan
				</Button>
			</div>
		</div>
	);
}
