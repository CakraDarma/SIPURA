interface postHero {
	imageUrl: string;
}

const Hero = ({ imageUrl }: postHero) => {
	const divStyle = {
		backgroundImage: `url(${imageUrl})`,
	};
	return (
		<>
			<section
				id='home'
				className={`flex flex-col justify-center items-center h-[80vh] object-cover bg-center bg-cover`}
				style={divStyle}
			>
				<h1 className='text-center text-white'>
					Menjelajahi Hidden Gem yang Tidak <br />
					Diketahui Banyak Orang
				</h1>
			</section>
		</>
	);
};

export default Hero;
