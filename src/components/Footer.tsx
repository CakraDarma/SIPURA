import { footConfig } from '@/config/foot';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='container h-full pt-12 max-w-7xl'>
				<div className='flex flex-col'>
					{/* <div className='flex flex-col items-center justify-start gap-6'>
						<h3 className='text-white text-[32px] font-medium leading-[38.40px]'>
							Ada Pertanyaan atau Saran?
						</h3>
						<p className='text-base font-normal leading-normal text-center text-white'>
							Pesan Anda akan dikirimkan kepada kami untuk pengembangan website
							ini. Yuk jangan ragu untuk memberikan pesan dengan kami!
						</p>
						<button className='px-3 py-4 border border-white justify-center items-center gap-2.5 inline-flex'>
							<div className='text-xs font-normal leading-normal text-white'>
								Contact Us
							</div>
						</button>
					</div> */}
					<div className='flex flex-col items-start justify-between gap-10 pb-20 border-b border-white md:flex-row'>
						<div className='inline-flex flex-col items-start justify-start gap-6 max-w-[80%]'>
							<h2 className='text-white text-[32px] font-medium leading-[38.40px]'>
								LOGO
							</h2>
							<p className='text-base font-normal leading-normal text-white '>
								Sistem informasi dan virtual tour Pura menghadirkan kelestarian
								Pura dalam bentuk digital melibatkan pengguna dalam pengalaman
								interaktif yang mendalam.
							</p>
						</div>
						<div className='inline-flex flex-col items-start justify-start gap-6'>
							<h3 className='text-white text-2xl font-medium leading-[28.80px]'>
								Informasi terkait
							</h3>
							{footConfig?.length ? (
								<div className='flex flex-col items-start justify-center gap-6'>
									{footConfig?.map((item, index) => (
										<Link
											key={index}
											href={item.href}
											className={
												'text-white text-base font-normal leading-normal'
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
				<div className='text-white text-xs font-medium leading-[18px] py-3'>
					© 2023 Website By Information Technology Universitas Udayana
				</div>
			</div>
		</div>
	);
};

export default Footer;
