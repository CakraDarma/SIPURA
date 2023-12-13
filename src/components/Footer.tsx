import { footConfig } from '@/config/foot';
import Link from 'next/link';
import { Icons } from '@/components/Icons';

const Footer = () => {
	return (
		<div className='border-t-2'>
			<div className='container h-full pt-6 max-w-7xl'>
				<div className='flex flex-col'>
					<div className='flex flex-col items-start justify-between gap-10 pb-10 border-b md:flex-row'>
						<div className='inline-flex flex-col items-start justify-start gap-6 max-w-[80%]'>
							<div className='flex items-center justify-center gap-3'>
								<Icons.logo />
								<h2 className=' text-2xl font-medium leading-[38.40px] flex'>
									SIJALAN
								</h2>
							</div>
							<p className='text-base font-normal leading-normal '>
								Sistem informasi dan virtual tour Pura menghadirkan kelestarian
								Pura dalam bentuk digital melibatkan pengguna dalam pengalaman
								interaktif yang mendalam.
							</p>
						</div>
						<div className='inline-flex flex-col items-start justify-start gap-6'>
							<h3 className=' text-2xl font-medium leading-[28.80px]'>
								Informasi terkait
							</h3>
							{footConfig?.length ? (
								<div className='flex flex-col items-start justify-center gap-4'>
									{footConfig?.map((item, index) => (
										<Link
											key={index}
											href={item.href}
											className={
												'text-sm font-light leading-normal hover:font-semibold'
											}
										>
											{item.title}
										</Link>
									))}
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className=' text-xs font-medium leading-[18px] py-3'>
					© 2023 Website By Information Technology Universitas Udayana
				</div>
			</div>
		</div>
	);
};

export default Footer;
