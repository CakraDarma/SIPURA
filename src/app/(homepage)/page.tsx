import Hero from '@/components/Hero';
import VideoInformation from '@/components/homepage/VideoInformation';
import Announce from '@/components/homepage/Announce';
import About from '@/components/homepage/About';
import JoinUsPage from '@/components/homepage/JoinUs';
// import Features from '@/components/homepage/Features';
{
	// console.log(process.env);
}
const Home = () => {
	return (
		<div className='flex flex-col'>
			<Hero
				imageUrl='/images/hero2.jpg'
				heading='Eksplorasi Pura Melalui Portal Informasi yang Interaktif'
				text='SIPURA: Sistem Informasi dan Virtual Tour Pura'
			/>
			{/* <Features /> */}
			<About />
			<VideoInformation />
			<Announce />
			<JoinUsPage />
		</div>
	);
};

export default Home;
