import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormCreatePelinggih from '@/components/form/FormCreatePelinggih';

const Page = async () => {
	return (
		<DashboardShell>
			<DashboardHeader
				heading='Dashboard'
				text='Kelola semua aspek terkait dengan Pura dalam satu lokasi yang nyaman.'
			/>
			<hr className='h-px bg-red-500' />
			<FormCreatePelinggih />
		</DashboardShell>
	);
};

export default Page;
