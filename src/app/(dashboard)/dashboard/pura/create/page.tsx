import DashboardHeader from '@/components/DashboardHeader';
import FormCreatePura from '@/components/form/FormCreatePura';

const Page = async () => {
	return (
		<div className='max-w-4xl mx-auto'>
			<div className='grid items-start gap-8'>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
				/>
				<FormCreatePura />
			</div>
		</div>
	);
};

export default Page;
