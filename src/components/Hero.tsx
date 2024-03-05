interface postHero {
	imageUrl: string;
	heading: string;
	text: string | null;
}

import { BalineseDate } from 'balinese-date-js-lib';
const specificDate = new Date('2021-12-31T12:00:00');
const now = new BalineseDate(specificDate);

console.log(now.saka); // show the saka

const Hero = ({ imageUrl, text, heading }: postHero) => {
	const divStyle = {
		backgroundImage: `url(${imageUrl})`,
	};
	return (
		<>
			<section
				id='home'
				className={`flex flex-col justify-center items-center h-[100vh] object-center bg-center bg-cover `}
				style={divStyle}
			>
				<div className='container flex flex-col items-center justify-center gap-6 md:px-40'>
					<h1 className='text-center text-white heading-1'>{heading}</h1>
					<p className='text-sm font-thin text-center text-white md:text-xl font-heading '>
						{text}
					</p>
				</div>
			</section>
		</>
	);
};

export default Hero;
