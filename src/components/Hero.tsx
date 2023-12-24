import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

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
				className={`flex flex-col justify-center items-center h-[100vh] object-center bg-center bg-cover`}
				style={divStyle}
			>
				<div className='container flex flex-col items-center justify-center gap-6 md:px-40'>
					<h1 className='text-center text-white text-3xl  md:text-5xl font-normal md:leading-[76.80px] font-heading '>
						Eksplorasi Pura Melalui Portal Informasi yang Interaktif
					</h1>
					<p className='text-sm font-thin text-center text-white md:text-xl font-heading'>
						SIPURA: Sistem Informasi dan Virtual Tour Pura
					</p>
					<Link
						href={'/'}
						className={buttonVariants({
							variant: 'outline',
							className: 'text-sm w-32',
						})}
					>
						Selengkapnya
					</Link>
				</div>
			</section>
		</>
	);
};

export default Hero;
