import DashboardHeader from '@/components/DashboardHeader';
import FormCreatePura from '@/components/form/FormCreatePura';
import { db } from '@/lib/db';

const Page = async () => {
	const kecamatans = await db.kecamatan.findMany({
		include: {
			desas: true,
		},
	});
	return (
		<div className='container mx-auto space-y-10 max-w-7xl'>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
			/>
			<FormCreatePura data={kecamatans} />
		</div>
	);
};

export default Page;
