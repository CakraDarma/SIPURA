import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormCreateVirtualTour from '@/components/form/FormCreateVirtualTour';

const Page = async () => {
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormCreateVirtualTour />
		</DashboardShell>
	);
};

export default Page;
