import DashboardHeader from '@/components/DashboardHeader';
import FormCreateInventaris from '@/components/form/FormCreateInventaris';

const Page = async () => {
	return (
		<div className='container flex flex-col w-full h-full space-y-6'>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormCreateInventaris />
		</div>
	);
};

export default Page;
