'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { Pura, Pelinggih } from '@prisma/client';
import TableInventaris from '../TableInventaris';
import { useParams } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

type PuraWithPelinggihs = Pura & {
	pelinggihs: Pelinggih[];
};

export default function Pelinggih() {
	const params = useParams();
	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(`/api/pelinggih/${params.puraId}`);
			const datas: PuraWithPelinggihs = response.data;
			const pelinggihPura = datas?.pelinggihs.map(
				({ id, tahunPeninggalan, thumbnail, createdAt, nama }) => ({
					id,
					nama,
					tahunPeninggalan,
					thumbnail,
					createdAt,
				})
			);
			setData(pelinggihPura);
		} catch (error) {
			return toast({
				title: 'Gagal Menampilkan Data.',
				description: 'Silakan coba beberapa saat kembali.',
				variant: 'destructive',
			});
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className='py-5 px-[50px] w-full mx-auto mt-5 bg-background container '>
			<div>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div>
						<TableInventaris data={data} />
					</div>
				)}
			</div>
		</div>
	);
}
