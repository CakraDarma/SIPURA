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
			<div className='w-[1440px] h-[950px] py-20 flex-col justify-center items-center gap-2.5 inline-flex'>
				<div className='w-[1017px] h-[790px] relative'>
					<div className='w-[801px] h-[725px] left-[216px] top-[65px] absolute bg-red-400' />
					<img
						className='w-[515px] h-[719.50px] left-0 top-0 absolute'
						src='/pura.png'
					/>
					<div className='w-[375px] h-[515px] left-[580.50px] top-[204.55px] absolute flex-col justify-start items-start gap-16 inline-flex'>
						<div className='flex-col justify-start items-start gap-6 flex'>
							<div className='text-white text-[64px] font-medium leading-[76.80px]'>
								Pura
							</div>
							<div className='w-[375px] justify-start items-start gap-2.5 inline-flex'>
								<div className='grow shrink basis-0 text-white text-base font-normal leading-normal'>
									Pura adalah istilah dalam bahasa Indonesia untuk merujuk pada
									kuil Hindu. Kuil-kuil Hindu di Bali umumnya disebut sebagai
									pura, sedangkan di India dan negara-negara lain, mungkin
									memiliki istilah yang berbeda. <br />
									<br />
									Pura adalah tempat suci bagi umat Hindu, tempat mereka
									melakukan ritual keagamaan, berdoa, dan bersembahyang kepada
									para dewa. Arsitektur pura biasanya dipengaruhi oleh gaya
									arsitektur Hindu, dan biasanya memiliki struktur bangunan yang
									kompleks, berbagai patung, relief, dan ornamen yang menarik.
								</div>
							</div>
						</div>
						<div className='px-4 py-2.5 border border-white flex-col justify-start items-start gap-2.5 flex'>
							<div className='justify-start items-center gap-1 inline-flex'>
								<div className='text-white text-xs font-medium uppercase leading-[18px] tracking-wide'>
									Selengkapnya
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
