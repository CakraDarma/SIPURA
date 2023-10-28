import Hero from '@/components/Hero';
import VideoInformation from '@/components/homepage/VideoInformation';
import Announce from '@/components/homepage/Announce';
import About from '@/components/homepage/About';
import Navbar from '@/components/Navbar';

const Home = () => {
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<Navbar />
			<div className='flex flex-col gap-4'>
				<Hero imageUrl='/images/hero.png' />
				<About />
				<VideoInformation />
				<Announce />
			</div>
		</>
	);
};

export default Home;
