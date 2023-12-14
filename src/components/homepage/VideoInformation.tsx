const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='container max-w-7xl py-28'>
				<div className='flex flex-col justify-start'>
					<h2 className='text-3xl font-medium text-white md:text-4xl font-heading'>
						Video
					</h2>
				</div>
				<video className='mt-6' controls={true} width={863} height={552}>
					{/* <source src='./videos/test.mp4' type='video/mp4' /> */}
				</video>

				<div className='flex flex-col items-end gap-6 mt-10'>
					<h3 className='max-w-3xl text-xl text-white md:text-2xl font-heading'>
						Nikmati Video Pengenalan Pura dan Pelajari Keunikan Pura di Bali
					</h3>
					<p className='max-w-3xl text-lg font-light leading-normal text-white sm:text-xl '>
						Kami menyajikan video pengenalan Pura untuk memberikan gambaran
						sejarah dan keunikan setiap Pura di Bali kepada Anda. Nikmati
						pengalaman menarik dan mendalam dengan menonton video ini, serta
						pelajari lebih banyak tentang kebudayaan dan agama Hindu di Bali.
					</p>
				</div>
			</div>
		</div>
	);
};

export default VideoInformation;
