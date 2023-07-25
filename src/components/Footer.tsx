const Footer = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='max-w-7xl container mx-auto h-full pt-12'>
				<div className='flex-col justify-start items-center gap-[120px] flex'>
					<div className='flex-col justify-start items-center gap-6 flex'>
						<h3 className='text-white text-[32px] font-medium leading-[38.40px]'>
							Ada Pertanyaan atau Saran?
						</h3>
						<div className='text-center text-white text-base font-normal leading-normal'>
							Pesan Anda akan dikirimkan kepada kami untuk pengembangan website
							ini. Yuk jangan ragu untuk memberikan pesan dengan kami!
						</div>
					</div>
					<div className='pb-20 border-b border-white justify-between items-start gap-[212px] inline-flex'>
						<div className='flex-col justify-start items-start gap-6 inline-flex'>
							<h2 className='text-white text-[32px] font-medium leading-[38.40px]'>
								LOGO
							</h2>
							<div className=' text-white text-base font-normal leading-normal'>
								Sistem Informasi Pura adalah platform untuk mengeksplorasi dan
								mempelajari Pura secara lebih menarik. Pengguna dapat merasakan
								pengalaman berjalan-jalan di sekitar pura dengan tampilan 360
								derajat yang memukau.
							</div>
						</div>
						<div className='flex-col justify-start items-start gap-6 inline-flex'>
							<h3 className='text-white text-2xl font-medium leading-[28.80px]'>
								Information
							</h3>
							<div className='flex-col justify-center items-start gap-6 flex'>
								<div className='text-white text-base font-normal leading-normal'>
									Home
								</div>
								<div className='text-white text-base font-normal leading-normal'>
									Desa
								</div>
								<div className='text-white text-base font-normal leading-normal'>
									Pura
								</div>
								<div className='text-white text-base font-normal leading-normal'>
									Gallery
								</div>
							</div>
						</div>
						<div className='flex-col justify-start items-start gap-6 inline-flex'>
							<h2 className='text-white text-2xl font-medium leading-[28.80px]'>
								Any question?
							</h2>
							<div className='px-3 py-4 border border-white justify-center items-center gap-2.5 inline-flex'>
								<div className='text-white text-xs font-normal leading-normal'>
									Contact Us
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='text-white text-xs font-medium leading-[18px] p-3'>
					© 2023 Website By Information Technology Universitas Udayana
				</div>
			</div>
		</div>
	);
};

export default Footer;
