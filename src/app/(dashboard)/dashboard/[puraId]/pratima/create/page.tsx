import BackButton from '@/components/BackButton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import FormCreatePratima from '@/components/form/FormCreatePratima';

const Page = async () => {
	return (
		<>
			<div className=' w-fit'>
				<BackButton />
			</div>
			<DashboardShell>
				<DashboardHeader
					heading='Dashboard'
					text='Kelola semua aspek terkait dengan pura dalam satu lokasi yang nyaman.'
				/>
				<hr className='h-px bg-red-500' />
				<FormCreatePratima />
			</DashboardShell>
		</>
	);
};

export default Page;
