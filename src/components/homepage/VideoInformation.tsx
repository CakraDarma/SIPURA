const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='container max-w-7xl py-28'>
				<div className='flex flex-col justify-start'>
					<h2 className='text-3xl font-medium text-white md:text-4xl font-heading'>
						Video
					</h2>
				</div>
				{/* <video className='mt-6' controls={true} width={863} height={552}> */}
				{/* <source src='./videos/test.mp4' type='video/mp4' /> */}
				{/* </video> */}
				<iframe
					title='Virtual Tour'
					width='863'
					height='552'
					src={'https://www.youtube.com/embed/_BYZyad-WwM?si=3TUCVuK_BCuf949C'}
					allowFullScreen
					className='mt-6'
				></iframe>

				<div className='flex flex-col items-end gap-6 mt-10'>
					<h3 className='max-w-3xl text-xl text-white md:text-2xl font-heading'>
						Nikmati Video Pengenalan Pura dan Pelajari Keunikan Pura di Bali
					</h3>

					<p className='max-w-3xl font-sans text-lg font-light text-justify text-zinc-200 sm:text-xl'>
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
