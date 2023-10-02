import Hero from '@/components/Hero';
import VideoInformation from '@/components/homepage/VideoInformation';
import Announce from '@/components/homepage/Announce';

function Home() {
	return (
		<>
			<Hero imageUrl='/hero.png' />
			{/* <About /> */}
			<VideoInformation />
			<Announce />
			{/* <ChooseUs /> */}
			{/* <Trainers /> */}
			{/* <Testimonials /> */}
			{/* <Gallery /> */}
			{/* <BmiCalc /> */}
			{/* <Pricing /> */}
			{/* <Blog /> */}
			{/* <CtaBanner /> */}
			{/* <Footer /> */}
		</>
	);
}

export default Home;
