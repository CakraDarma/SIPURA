import React from 'react';
import KalenderBali from '@/components/KalenderBali';
import DashboardShell from '@/components/DashboardShell';
import DashboardHeader from '@/components/DashboardHeader';

function KalenderPage() {
	return (
		<div className='container md:py-20 max-w-7xl'>
			<DashboardShell>
				<DashboardHeader
					heading='Profil Akun'
					text='Kelola informasi pribadi anda.'
				/>
				<div className='grid gap-10'>
					<KalenderBali />
				</div>
			</DashboardShell>
		</div>
	);
}

export default KalenderPage;
