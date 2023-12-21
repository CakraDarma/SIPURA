import { Link } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { buttonVariants } from '../ui/Button';
import { db } from '@/lib/db';
import ColumnsInventaris from '../ColumnsInventaris';
import TableDataInventaris from '../TableDataInventaris';
import axios from 'axios';

import { Pura, Pelinggih } from '@prisma/client'; // Pastikan path sesuai dengan struktur folder Anda

type PuraWithPelinggihs = Pura & {
	pelinggihs: Pelinggih[];
};

export default function Pelinggih() {
	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('/api/pelinggih/cakra');
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
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='py-5 px-[50px] w-full mx-auto mt-5 bg-background container '>
			<div>
				{loading ? (
					<p>Loading...</p>
				) : (
					<div>
						<p>Data: {JSON.stringify(data)}</p>
						<TableDataInventaris data={data} columns={ColumnsInventaris} />
					</div>
				)}
			</div>
		</div>
	);
}
