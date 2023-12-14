const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='container max-w-7xl py-28'>
				<div className='flex flex-col justify-start'>
					<h1 className='text-white text-2xl md:text-4xl font-medium leading-[76.80px]'>
						Video
					</h1>
				</div>
				<video className='mt-6' controls={true} width={863} height={552}>
					{/* <source src='./videos/test.mp4' type='video/mp4' /> */}
				</video>

				<div className='flex flex-col items-end gap-6 mt-10'>
					<h3 className='max-w-3xl text-xl text-white md:text-2xl'>
						Nikmati Video Pengenalan Pura Kami dan Pelajari Sejarah dan Keunikan
						Pura di Bali
					</h3>
					<p className='max-w-3xl text-base font-light leading-normal text-white '>
						Kami menyajikan video pengenalan pura untuk memberikan gambaran
						sejarah dan keunikan setiap pura di Bali kepada Anda. Nikmati
						pengalaman menarik dan mendalam dengan menonton video ini, serta
						pelajari lebih banyak tentang kebudayaan dan agama Hindu di Bali.
					</p>
				</div>
			</div>
		</div>
	);
};

export default VideoInformation;
