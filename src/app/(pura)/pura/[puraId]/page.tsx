import EditorOutput from '@/components/EditorOutput';
import Hero from '@/components/Hero';
import { Icons } from '@/components/Icons';
import PuraNav from '@/components/PuraNav';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';

interface PuraPageProps {
	params: {
		puraId: string;
	};
}

export default async function Purapage({ params }: PuraPageProps) {
	const pura = await db.pura.findFirst({
		where: {
			id: params.puraId,
		},
	});
	if (!pura) {
		redirect('/');
	}
	return (
		<>
			<div className='container py-10 max-w-7xl'>
				<h2 className='mb-3 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
					Profil
				</h2>
				<div className='flex flex-row items-center gap-2 mb-6'>
					<Icons.jam className='w-5 h-5' />
					{formatDate(pura.createdAt)}
				</div>
				<EditorOutput content={pura.konten} />
			</div>
		</>
	);
}
