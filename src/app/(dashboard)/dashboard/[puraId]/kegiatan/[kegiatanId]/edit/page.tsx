import { notFound, redirect } from 'next/navigation';
import { Kegiatan, User } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { Editor } from '@/components/Editor';
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
		redirect(authOptions?.pages?.signIn || '/login');
	}

	const kegiatan = await getKegiatanForUser(params.kegiatanId, session.user.id);
	if (!kegiatan) {
		notFound();
	}

	return (
		<div className='flex flex-col items-start gap-6'>
			{/* heading */}
			<div className='border-b border-gray-200 pb-5'>
				<div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
					<h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
						Buat postingan
					</h3>
					<p className='ml-2 mt-1 truncate text-sm text-gray-500'>
						di {params.puraId}
					</p>
				</div>
			</div>

			{/* form */}
			<Editor
				kegiatan={{
					id: kegiatan.id,
					title: kegiatan.title,
					content: kegiatan.content,
					puraId: kegiatan.puraId,
				}}
			/>

			<div className='w-full flex justify-end'>
				<Button type='submit' className='w-full' form='pura-kegiatan-form'>
					Kegiatan
				</Button>
			</div>
		</div>
	);
}
