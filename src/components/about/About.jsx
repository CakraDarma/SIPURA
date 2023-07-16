import AboutCarts from './AboutCarts';
// import TitleRed from "../../images/who-we-are/title-bg.svg";
// import TrainersIcon from "../../images/who-we-are/weightlifter.png";
// import ModernIcon from "../../images/who-we-are/equpments.png";
// import LiftIcon from "../../images/who-we-are/gym.png";
// import GirlRunning from "../../images/who-we-are/girl-run.png";
// import GirlRedBg from "../../images/who-we-are/girl-redbg.svg";
// import GirlText from "../../images/who-we-are/girl-side-text.png";
// import GirlWind from "../../images/who-we-are/wind.png";
// import MainButton from "../MainButton";

function About() {
	return (
		<>
			<section className='flex flex-col justify-between gap-2 about-section pb-[20rem]'>
				<div className='container page-padding'>
					{/* about cards */}
					<div className='about-cards flex gap-10 -mt-[8.5rem] md1000:flex-col'>
						<AboutCarts />
					</div>
				</div>
			</section>
		</>
	);
}

export default About;
