import Hero from '@/components/Hero';
import VideoInformation from '@/components/homepage/VideoInformation';
import Announce from '@/components/homepage/Announce';
import About from '@/components/homepage/About';
// import Features from '@/components/homepage/Features';

const Home = () => {
	return (
		<div className='flex flex-col'>
			<Hero imageUrl='/images/hero2.jpg' />
			{/* <Features /> */}
			<About />
			<VideoInformation />
			<Announce />
		</div>
	);
};

export default Home;
