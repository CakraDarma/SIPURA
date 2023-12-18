interface DashboardHeaderProps {
	heading: string;
	text?: string;
	children?: React.ReactNode;
}

export default function DashboardHeader({
	heading,
	text,
	children,
}: DashboardHeaderProps) {
	return (
		<div className='flex items-center justify-between px-2'>
			<div className='grid gap-1'>
				<h1 className='font-sans text-3xl font-medium md:text-4xl'>
					{heading}
				</h1>
				{text && (
					<p className='font-sans text-lg text-muted-foreground'>{text}</p>
				)}
			</div>
			{children}
		</div>
	);
}
