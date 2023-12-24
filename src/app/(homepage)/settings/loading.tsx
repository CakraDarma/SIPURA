import DashboardHeader from '@/components/DashboardHeader';
import DashboardShell from '@/components/DashboardShell';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardSettingsLoading() {
	return (
		<div className='max-w-4xl py-12 mx-auto mt-10'>
			<div className='grid items-start gap-8'>
				<DashboardShell>
					<DashboardHeader
						heading='Profil Akun'
						text='Kelola informasi pribadi anda.'
					/>
					<div className='grid gap-10'>
						<div className='flex items-center justify-between w-full'>
							<Skeleton className='h-[38px] w-[90px]' />
							<Skeleton className='h-[38px] w-[80px]' />
						</div>
						<div className='mx-auto w-[800px] space-y-6'>
							<Skeleton className='h-[50px] w-full' />
							<Skeleton className='h-[20px] w-2/3' />
							<Skeleton className='h-[20px] w-full' />
							<Skeleton className='h-[20px] w-full' />
							<Skeleton className='h-[50px] w-full' />
							<Skeleton className='h-[20px] w-2/3' />
							<Skeleton className='h-[50px] w-full' />
							<Skeleton className='h-[20px] w-2/3' />
							<Skeleton className='h-[50px] w-full' />
							<Skeleton className='h-[20px] w-2/3' />
							<Skeleton className='h-[50px] w-full' />
							<Skeleton className='h-[20px] w-2/3' />
						</div>
					</div>
				</DashboardShell>
			</div>
		</div>
	);
}
