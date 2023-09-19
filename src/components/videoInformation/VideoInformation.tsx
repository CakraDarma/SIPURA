const VideoInformation = () => {
	return (
		<div className=' bg-neutral-600 pb-20'>
			<div className='max-w-7xl container mx-auto pt-12  bg-neutral-600'>
				<div className='flex-col justify-start flex my-6'>
					<h1 className='w-96 text-white self-stretch'>Video</h1>
				</div>
				<video controls={true} width={863}>
					<source src='/videos/test1.mp4' type='video/mp4' />
				</video>
				<div className='flex flex-col items-end h-[173px] gap-6 mt-10'>
					<h3 className='w-[837.25px] text-white text-[32px] font-normal leading-[38.40px]'>
						Nikmati Video Pengenalan Pura Kami dan Pelajari Sejarah dan Keunikan
						Pura di Bali
					</h3>
					<p className='w-[838px] text-white text-base font-normal leading-normal mb-20'>
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
