import CardSkeleton from '@/components/CardSkeleton';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';

export default function DashboardSettingsLoading() {
	return (
		<div className='max-w-4xl mx-auto py-12'>
			<div className='grid items-start gap-8'>
				<DashboardShell>
					<DashboardHeader
						heading='Settings'
						text='Manage account and website settings.'
					/>
					<div className='grid gap-10'>
						<CardSkeleton />
					</div>
				</DashboardShell>
			</div>
		</div>
	);
}
