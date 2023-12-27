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
		<div className='max-w-4xl mx-auto'>
			<div className='grid items-start gap-8'>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
				/>
				<FormCreatePura data={kecamatans} />
			</div>
		</div>
	);
};

export default Page;
