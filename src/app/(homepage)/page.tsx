import Hero from '@/components/Hero';
import VideoInformation from '@/components/homepage/VideoInformation';
import Announce from '@/components/homepage/Announce';
import About from '@/components/homepage/About';

const Home = () => {
	return (
		<div className='flex flex-col gap-4'>
			<Hero imageUrl='/images/hero2.jpg' />
			<About />
			<VideoInformation />
			<Announce />
		</div>
	);
};

export default Home;
