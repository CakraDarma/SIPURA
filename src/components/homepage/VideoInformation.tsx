const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600'>
			<div className='max-w-7xl container py-12'>
				<div className='flex-col justify-start flex'>
					<h1 className='w-96 text-white self-stretch'>Video</h1>
				</div>
				<video controls={true} width={863}>
					{/* <source src='./videos/test.mp4' type='video/mp4' /> */}
				</video>
				<div className='flex flex-col items-end gap-6 mt-10 mb-20'>
					<h3 className=' text-white'>
						Nikmati Video Pengenalan Pura Kami dan Pelajari Sejarah dan Keunikan
						Pura di Bali
					</h3>
					<p className=' text-white text-base font-normal leading-normal'>
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
