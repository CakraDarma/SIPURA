import EditorOutput from '@/components/EditorOutput';
import { Icons } from '@/components/Icons';
import { db } from '@/lib/db';
import {
	capitalizeFirstLetter,
	findNearestDateObject,
	formatDate,
	getDaysDifference,
} from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import {
	Wuku,
	Filter,
	PancaWara,
	BalineseDateUtil,
	SaptaWara,
} from 'balinese-date-js-lib';
import ButtonFollow from '@/components/ButtonFollow';

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
		include: {
			user: true,
		},
	});
	if (!pura) {
		redirect('/');
	}

	const currentYear = new Date().getFullYear();
	const start = new Date();
	const finish = new Date(currentYear + 1, 11, 31);
	const q = new Filter();

	q.saptaWara = SaptaWara[pura.saptaWara];
	q.pancaWara = PancaWara[pura.pancaWara];
	q.wuku = Wuku[pura.wuku];

	const arr = BalineseDateUtil.filterByDateRange(start, finish, q);
	// @ts-ignore
	const nextPiodalan = findNearestDateObject(arr);

	const targetDate2 = new Date(nextPiodalan);
	const daysDifference = getDaysDifference(targetDate2);

	return (
		<>
			<div className='container py-10 max-w-7xl'>
				<h2 className='mb-3 text-3xl font-medium tracking-wide text-gray-800 border-b-2 dark:text-white md:text-4xl font-heading border-orange-light w-fit'>
					Profil
				</h2>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-row justify-start gap-6 font-semibold'>
						<p className='flex flex-row items-center gap-2 text-base xs:text-xl'>
							<Image
								// @ts-ignore
								src={pura.user.image}
								alt='Gambar'
								className='w-5 h-5 rounded-full xs:w-6 xs:h-6'
								width={1000}
								height={1000}
							/>
							{pura.user.name}
						</p>
						<p className='flex flex-row items-center gap-2 text-base xs:text-xl'>
							<Icons.jam className='w-5 h-5 rounded-full xs:w-6 xs:h-6' />
							{formatDate(pura.createdAt)}
						</p>
					</div>
					<div className='text-lg capitalize xs:text-xl'>
						<p>Alamat: {pura.alamat}</p>
						<p>Kategori: {`Pura ${capitalizeFirstLetter(pura.kategori)}`}</p>
						<p>
							Piodalan:{' '}
							{`${capitalizeFirstLetter(
								pura.saptaWara
							)} ${capitalizeFirstLetter(
								pura.pancaWara
							)} ${capitalizeFirstLetter(pura.wuku)}`}
						</p>
						<div className='flex flex-row items-center gap-2'>
							<p>
								{`Piodalan Selanjutnya: ${formatDate(nextPiodalan)}`}
								<span className='text-gray-700 lowercase'>{` (${daysDifference} hari lagi)`}</span>
							</p>
							<ButtonFollow puraId={params.puraId} />
						</div>
						<p>Tahun berdiri: {pura.tahunBerdiri}</p>
					</div>
				</div>
				<EditorOutput content={pura.konten} />
			</div>
		</>
	);
}
