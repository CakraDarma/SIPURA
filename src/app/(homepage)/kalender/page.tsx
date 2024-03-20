'use client';

import React, { useEffect } from 'react';
import KalenderBali from '@/components/KalenderBali';
import DashboardShell from '@/components/DashboardShell';
import DashboardHeader from '@/components/DashboardHeader';

function KalenderPage() {
	useEffect(() => {
		// Tambahkan event listener untuk mendengarkan pesan dari iframe
		const handleMessage = (event: any) => {
			// Periksa apakah pesan yang diterima adalah pesan yang diinginkan
			if (event.data.type === 'dateClick') {
				// Tangani pesan dan ekstrak informasi tanggal
				const dateClicked = event.data.date;
				console.log('Tanggal yang diklik:', dateClicked);
				// Lakukan sesuatu dengan tanggal yang diklik
			}
		};
		window.addEventListener('message', handleMessage);

		// Cleanup: hapus event listener saat komponen unmount
		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);
	return (
		<div className='container md:py-20 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Profil Akun'
					text='Kelola informasi pribadi anda.'
				/>
				<div className='grid gap-10'>
					{/* <KalenderBali /> */}
					<iframe
						src='http://www.kalenderbali.info/kalenderbali/widget'
						width='500'
						height='730'
					></iframe>
				</div>
			</DashboardShell>
		</div>
	);
}

export default KalenderPage;
