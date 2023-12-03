import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export default function FooterDashboard({
	className,
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn(className)}>
			<div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-12 md:flex-row md:py-0'>
				<div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
					<Icons.logo2 />
					<p className='text-sm leading-loose text-center md:text-left'>
						Lorem ipsum dolor sit amet consectetur
					</p>
				</div>
			</div>
		</footer>
	);
}
