const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='container max-w-7xl py-28'>
				<div className='flex flex-col justify-start'>
					<h2 className='text-4xl font-medium text-white md:text-5xl font-heading'>
						Video Pengenalan
					</h2>
				</div>
				<div className='w-full md:w-2/3 md:h-96 h-72 '>
					<iframe
						title='Virtual Tour'
						src={
							'https://www.youtube.com/embed/_BYZyad-WwM?si=3TUCVuK_BCuf949C'
						}
						allowFullScreen
						className='w-full h-full mt-6'
					></iframe>
				</div>

				<div className='flex flex-col items-end gap-6 mt-10'>
					<h3 className='max-w-3xl text-2xl leading-relaxed text-white md:text-3xl font-heading'>
						Nikmati Video Pengenalan SIPura dan Pelajari Keunikan Pura di Bali
					</h3>

					<p className='max-w-3xl font-sans text-xl font-light text-justify text-zinc-200 sm:text-2xl'>
						Kami menyajikan video pengenalan SIPura untuk memberikan gambaran
						mengenai aplikasi ini serta pelajari lebih banyak tentang kebudayaan
						agama Hindu di Bali.
					</p>
				</div>
			</div>
		</div>
	);
};

export default VideoInformation;
